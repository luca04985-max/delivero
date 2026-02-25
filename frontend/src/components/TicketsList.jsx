import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logger from '../utils/logger';
import { ticketsListStyles } from '../styles/TicketsListStyles';

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://delivero-gyjx.onrender.com/api/tickets/my-tickets',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setTickets(response.data);
    } catch (error) {
      logger.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTicketDetails = async ticketId => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://delivero-gyjx.onrender.com/api/tickets/${ticketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSelectedTicket(response.data);
    } catch (error) {
      logger.error('Error fetching ticket details:', error);
    }
  };

  const handleAddComment = async e => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setAddingComment(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `https://delivero-gyjx.onrender.com/api/tickets/${selectedTicket.id}/comments`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setComment('');
      // Refresh ticket details
      await getTicketDetails(selectedTicket.id);
    } catch (error) {
      logger.error('Error adding comment:', error);
    } finally {
      setAddingComment(false);
    }
  };

  const getStatusColor = status => {
    const colors = {
      open: '#ff9800',
      in_progress: '#2196f3',
      resolved: '#4caf50',
      closed: '#757575',
    };
    return colors[status] || '#999';
  };

  const getTypeIcon = type => {
    const icons = {
      bug: '🐛',
      complaint: '😞',
      feature_request: '💡',
      support: '🆘',
    };
    return icons[type] || '📝';
  };

  const filteredTickets =
    filterStatus === 'all' ? tickets : tickets.filter(t => t.status === filterStatus);

  if (loading) {
    return (
      <div style={ticketsListStyles.loading}>
        <div style={ticketsListStyles.loadingSpinner}></div>
        <div>Caricamento ticket in corso...</div>
      </div>
    );
  }

  return (
    <div style={ticketsListStyles.container}>
      <h1 style={ticketsListStyles.title}>📋 I Miei Ticket</h1>

      {!selectedTicket ? (
        <>
          <div style={ticketsListStyles.filterSection}>
            <label style={ticketsListStyles.filterLabel}>Filtra per stato:</label>
            <select
              style={ticketsListStyles.filterSelect}
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">Tutti</option>
              <option value="open">Aperti</option>
              <option value="in_progress">In corso</option>
              <option value="resolved">Risolti</option>
              <option value="closed">Chiusi</option>
            </select>
          </div>

          {filteredTickets.length === 0 ? (
            <div style={ticketsListStyles.emptyState}>
              <div style={ticketsListStyles.emptyIcon}>📭</div>
              <div style={ticketsListStyles.emptyTitle}>Nessun ticket trovato</div>
              <div style={ticketsListStyles.emptyText}>
                {filterStatus === 'all'
                  ? 'Non hai ancora creato nessun ticket'
                  : 'Nessun ticket con questo stato'}
              </div>
            </div>
          ) : (
            <div style={ticketsListStyles.ticketsList}>
              {filteredTickets.map(ticket => (
                <div
                  key={ticket.id}
                  style={ticketsListStyles.ticketCard}
                  onClick={() => getTicketDetails(ticket.id)}
                >
                  <div style={ticketsListStyles.headerCard}>
                    <span style={ticketsListStyles.ticketType}>{getTypeIcon(ticket.type)}</span>
                    <h3 style={ticketsListStyles.titleCard}>{ticket.title}</h3>
                  </div>

                  <p style={ticketsListStyles.ticketDescription}>{ticket.description}</p>

                  <div style={ticketsListStyles.ticketMeta}>
                    <span style={ticketsListStyles.ticketId}>#{ticket.id}</span>
                    <span style={ticketsListStyles.ticketDate}>
                      📅 {new Date(ticket.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <span
                    style={[
                      ticketsListStyles.statusBadge,
                      ticket.status === 'open' && ticketsListStyles.statusOpen,
                      ticket.status === 'in_progress' && ticketsListStyles.statusInProgress,
                      ticket.status === 'resolved' && ticketsListStyles.statusResolved,
                      ticket.status === 'closed' && ticketsListStyles.statusClosed,
                    ]}
                  >
                    {ticket.status === 'open' && '🔴 Aperto'}
                    {ticket.status === 'in_progress' && '🟡 In corso'}
                    {ticket.status === 'resolved' && '🟢 Risolto'}
                    {ticket.status === 'closed' && '⚫ Chiuso'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={ticketsListStyles.detailSection}>
          <div style={ticketsListStyles.detailCard}>
            <div style={ticketsListStyles.detailHeader}>
              <h2 style={ticketsListStyles.detailTitle}>
                {getTypeIcon(selectedTicket.type)} {selectedTicket.title}
              </h2>
              <span
                style={{
                  ...ticketsListStyles.statusBadge,
                  backgroundColor: getStatusColor(selectedTicket.status),
                }}
              >
                {selectedTicket.status}
              </span>
            </div>

            {selectedTicket.admin_notes && (
              <div style={ticketsListStyles.adminNotes}>
                <div style={ticketsListStyles.adminNotesTitle}>📌 Nota dell'Admin:</div>
                <p>{selectedTicket.admin_notes}</p>
              </div>
            )}

            <div style={ticketsListStyles.detailBody}>
              <p>
                <strong>Descrizione:</strong>
              </p>
              <p>{selectedTicket.description}</p>

              <p>
                <strong>Data creazione:</strong>{' '}
                {new Date(selectedTicket.created_at).toLocaleDateString('it-IT')}
              </p>
              <p>
                <strong>Priorità:</strong> {selectedTicket.priority}
              </p>
            </div>

            <div style={ticketsListStyles.commentsSection}>
              <h3 style={ticketsListStyles.commentsTitle}>
                💬 Commenti ({selectedTicket.comments?.length || 0})
              </h3>

              {selectedTicket.comments &&
                selectedTicket.comments.map(comment => (
                  <div key={comment.id} style={ticketsListStyles.commentCard}>
                    <div style={ticketsListStyles.commentHeader}>
                      <strong>{comment.user_name}</strong>
                      <span
                        style={[
                          ticketsListStyles.commentRole,
                          comment.role === 'admin' && ticketsListStyles.commentRoleAdmin,
                          comment.role === 'user' && ticketsListStyles.commentRoleUser,
                        ]}
                      >
                        {comment.role === 'admin' ? '🔐 Admin' : '👤 Utente'}
                      </span>
                      <span style={ticketsListStyles.commentDate}>
                        {new Date(comment.created_at).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                    <p style={ticketsListStyles.commentText}>{comment.comment}</p>
                  </div>
                ))}

              <form onSubmit={handleAddComment} style={ticketsListStyles.commentForm}>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Aggiungi un commento..."
                  rows="3"
                  style={ticketsListStyles.commentInput}
                />
                <button
                  type="submit"
                  disabled={addingComment}
                  style={ticketsListStyles.submitComment}
                >
                  {addingComment ? 'Invio...' : '📤 Invia Commento'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsList;
