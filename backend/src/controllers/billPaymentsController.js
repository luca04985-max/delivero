import * as BillPaymentModel from '../models/BillPayment.js';
import * as BillModel from '../models/User.js';
import * as OrderModel from '../models/Order.js';
import { uploadToS3, deleteFromS3 } from '../utils/s3.js';

// Create bill payment request
export const createBillPayment = async (req, res) => {
  try {
    const { billId, paymentMethod } = req.body; // paymentMethod: 'cash' or 'prepaid'
    const userId = req.user.id;

    // Get bill to verify and get amount
    const bill = await BillModel.getBillById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Bolletta non trovata' });
    }

    if (bill.user_id !== userId) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const billPayment = await BillPaymentModel.createBillPayment(
      billId,
      userId,
      paymentMethod,
      bill.amount,
    );

    res.status(201).json(billPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Upload barcode/QR code images to S3
export const uploadBillPaymentImages = async (req, res) => {
  try {
    const { billPaymentId } = req.params;
    const { barcode, qrCode } = req.files;

    const billPayment = await BillPaymentModel.getBillPaymentById(billPaymentId);
    if (!billPayment) {
      return res.status(404).json({ message: 'Pagamento bolletta non trovato' });
    }

    if (billPayment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    let barcodeUrl = null;
    let qrCodeUrl = null;

    if (barcode) {
      barcodeUrl = await uploadToS3(barcode[0], 'bill-payments/barcodes');
    }

    if (qrCode) {
      qrCodeUrl = await uploadToS3(qrCode[0], 'bill-payments/qrcodes');
    }

    const updated = await BillPaymentModel.updateBillPaymentImages(
      billPaymentId,
      barcodeUrl,
      qrCodeUrl,
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il caricamento', error: error.message });
  }
};

// Get bill payment details
export const getBillPayment = async (req, res) => {
  try {
    const { billPaymentId } = req.params;

    const billPayment = await BillPaymentModel.getBillPaymentById(billPaymentId);
    if (!billPayment) {
      return res.status(404).json({ message: 'Pagamento bolletta non trovato' });
    }

    if (
      billPayment.user_id !== req.user.id &&
      req.user.role !== 'admin' &&
      req.user.role !== 'rider'
    ) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    res.json(billPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Get user's bill payments
export const getUserBillPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await BillPaymentModel.getUserBillPayments(userId);
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Get pending bill payments for rider
export const getPendingBillPayments = async (req, res) => {
  try {
    if (req.user.role !== 'rider') {
      return res.status(403).json({ message: 'Solo i rider possono accedere' });
    }

    const payments = await BillPaymentModel.getPendingBillPayments(req.user.id);
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Assign rider to bill payment (admin only)
export const assignRider = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo gli admin possono assegnare rider' });
    }

    const { billPaymentId, riderId } = req.body;

    const updated = await BillPaymentModel.assignRiderToBillPayment(billPaymentId, riderId);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Update payment status (rider confirms payment received or collected cash)
export const updatePaymentStatus = async (req, res) => {
  try {
    const { billPaymentId } = req.params;
    const { status, riderPaymentStatus } = req.body;

    const billPayment = await BillPaymentModel.getBillPaymentById(billPaymentId);
    if (!billPayment) {
      return res.status(404).json({ message: 'Pagamento bolletta non trovato' });
    }

    if (billPayment.rider_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const updated = await BillPaymentModel.updateBillPaymentStatus(
      billPaymentId,
      status,
      riderPaymentStatus,
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Add rider notes
export const addNotes = async (req, res) => {
  try {
    const { billPaymentId } = req.params;
    const { notes } = req.body;

    const billPayment = await BillPaymentModel.getBillPaymentById(billPaymentId);
    if (!billPayment) {
      return res.status(404).json({ message: 'Pagamento bolletta non trovato' });
    }

    if (billPayment.rider_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const updated = await BillPaymentModel.addBillPaymentNotes(billPaymentId, notes);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Get bill payment statistics (admin only)
export const getStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo gli admin possono accedere' });
    }

    const { startDate, endDate } = req.query;
    const stats = await BillPaymentModel.getBillPaymentStats(startDate, endDate);
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Upload bill photo with camera permission
export const uploadBillPhoto = async (req, res) => {
  try {
    const { billPaymentId } = req.params;
    const { billPhoto } = req.files;
    const { cameraPermissionGranted } = req.body;

    if (!billPhoto) {
      return res.status(400).json({ message: 'Nessuna foto della bolletta fornita' });
    }

    const billPayment = await BillPaymentModel.getBillPaymentById(billPaymentId);
    if (!billPayment) {
      return res.status(404).json({ message: 'Pagamento bolletta non trovato' });
    }

    if (billPayment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    // Upload bill photo to S3
    const billPhotoUrl = await uploadToS3(billPhoto[0], 'bill-payments/photos');

    // Update bill payment with photo info
    const updated = await BillPaymentModel.updateBillPaymentPhoto(
      billPaymentId,
      billPhotoUrl,
      cameraPermissionGranted === 'true',
      new Date(),
    );

    res.json(updated);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Errore durante il caricamento della foto', error: error.message });
  }
};

// Create order with bill photo
export const createOrderWithBillPhoto = async (req, res) => {
  try {
    const { billId, paymentMethod, deliveryAddress, billPhotoBase64, cameraPermissionGranted } =
      req.body;

    const userId = req.user.id;

    // Get bill to verify and get amount
    const bill = await BillModel.getBillById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Bolletta non trovata' });
    }

    if (bill.user_id !== userId) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    // Create bill payment first
    const billPayment = await BillPaymentModel.createBillPayment(
      billId,
      userId,
      paymentMethod,
      bill.amount,
    );

    // Process bill photo if provided
    let billPhotoUrl = null;
    if (billPhotoBase64 && cameraPermissionGranted) {
      // Convert base64 to buffer and upload
      const buffer = Buffer.from(billPhotoBase64.split(',')[1], 'base64');
      const filename = `bill-photo-${billPayment.id}-${Date.now()}.jpg`;

      // Create a mock file object for S3 upload
      const mockFile = {
        buffer: buffer,
        originalname: filename,
        mimetype: 'image/jpeg',
      };

      billPhotoUrl = await uploadToS3(mockFile, 'bill-payments/photos');

      // Update bill payment with photo info
      await BillPaymentModel.updateBillPaymentPhoto(billPayment.id, billPhotoUrl, true, new Date());
    }

    // Create order linked to bill payment
    const orderData = {
      user_id: userId,
      items: [
        {
          type: 'bill_payment',
          billId: billId,
          billPaymentId: billPayment.id,
          description: `Pagamento bolletta ${bill.type}`,
          amount: bill.amount,
          photoUrl: billPhotoUrl,
        },
      ],
      total_amount: bill.amount,
      delivery_address: deliveryAddress,
      status: 'pending',
    };

    const order = await OrderModel.createOrder(orderData);

    // Link order to bill payment
    await BillPaymentModel.updateBillPaymentOrderId(billPayment.id, order.id);

    res.status(201).json({
      message: 'Ordine creato con foto bolletta',
      order: order,
      billPayment: {
        ...billPayment,
        bill_photo_url: billPhotoUrl,
        camera_permission_granted: cameraPermissionGranted,
        photo_capture_timestamp: billPhotoUrl ? new Date() : null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Get bill payment with order details
export const getBillPaymentWithOrder = async (req, res) => {
  try {
    const { billPaymentId } = req.params;

    const billPayment = await BillPaymentModel.getBillPaymentWithOrder(billPaymentId);
    if (!billPayment) {
      return res.status(404).json({ message: 'Pagamento bolletta non trovato' });
    }

    if (
      billPayment.user_id !== req.user.id &&
      req.user.role !== 'admin' &&
      req.user.role !== 'rider'
    ) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    res.json(billPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};

// Create order with bill photo (mobile version - handles multipart form)
export const createOrderWithBillPhotoMobile = async (req, res) => {
  try {
    const { billId, paymentMethod, deliveryAddress, cameraPermissionGranted } = req.body;

    const billPhoto = req.file;
    const userId = req.user.id;

    // Get bill to verify and get amount
    const bill = await BillModel.getBillById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Bolletta non trovata' });
    }

    if (bill.user_id !== userId) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    // Create bill payment first
    const billPayment = await BillPaymentModel.createBillPayment(
      billId,
      userId,
      paymentMethod,
      bill.amount,
    );

    // Process bill photo if provided
    let billPhotoUrl = null;
    if (billPhoto && cameraPermissionGranted) {
      // Upload photo from mobile
      billPhotoUrl = await uploadToS3(billPhoto, 'bill-payments/photos');

      // Update bill payment with photo info
      await BillPaymentModel.updateBillPaymentPhoto(billPayment.id, billPhotoUrl, true, new Date());
    }

    // Create order linked to bill payment
    const orderData = {
      user_id: userId,
      items: [
        {
          type: 'bill_payment',
          billId: billId,
          billPaymentId: billPayment.id,
          description: `Pagamento bolletta ${bill.type}`,
          amount: bill.amount,
          photoUrl: billPhotoUrl,
        },
      ],
      total_amount: bill.amount,
      delivery_address: deliveryAddress,
      status: 'pending',
    };

    const order = await OrderModel.createOrder(orderData);

    // Link order to bill payment
    await BillPaymentModel.updateBillPaymentOrderId(billPayment.id, order.id);

    res.status(201).json({
      message: 'Ordine creato con foto bolletta (mobile)',
      order: order,
      billPayment: {
        ...billPayment,
        bill_photo_url: billPhotoUrl,
        camera_permission_granted: cameraPermissionGranted === 'true',
        photo_capture_timestamp: billPhotoUrl ? new Date() : null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore del server', error: error.message });
  }
};
