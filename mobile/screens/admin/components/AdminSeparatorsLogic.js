import { View, Text, TouchableOpacity } from 'react-native';

// Logica per i separatori espandibili
export const useAdminSeparators = (expandedSections, setExpandedSections) => {
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderOrderStatusSeparator = (status, count, info, isExpanded, styles) => (
    <TouchableOpacity
      style={styles.statusSeparator}
      onPress={() => toggleSection(status)}
      activeOpacity={0.7}
    >
      <View style={styles.statusSeparatorContent}>
        <View style={styles.statusSeparatorLeft}>
          <Text style={styles.statusSeparatorIcon}>{info.icon}</Text>
          <Text style={styles.statusSeparatorTitle}>{info.label}</Text>
        </View>
        <View style={styles.statusSeparatorRight}>
          <Text style={styles.statusSeparatorCount}>{count}</Text>
          <Text style={styles.statusSeparatorToggle}>{isExpanded ? '🔼' : '🔽'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTicketStatusSeparator = (status, count, info, isExpanded, styles) => (
    <TouchableOpacity
      style={styles.statusSeparator}
      onPress={() => toggleSection(status)}
      activeOpacity={0.7}
    >
      <View style={styles.statusSeparatorContent}>
        <View style={styles.statusSeparatorLeft}>
          <Text style={styles.statusSeparatorIcon}>{info.icon}</Text>
          <Text style={styles.statusSeparatorTitle}>{info.label}</Text>
        </View>
        <View style={styles.statusSeparatorRight}>
          <Text style={styles.statusSeparatorCount}>{count}</Text>
          <Text style={styles.statusSeparatorToggle}>{isExpanded ? '🔼' : '🔽'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderUserRoleSeparator = (role, count, info, isExpanded, styles) => (
    <TouchableOpacity
      style={styles.statusSeparator}
      onPress={() => toggleSection(role)}
      activeOpacity={0.7}
    >
      <View style={styles.statusSeparatorContent}>
        <View style={styles.statusSeparatorLeft}>
          <Text style={styles.statusSeparatorIcon}>{info.icon}</Text>
          <Text style={styles.statusSeparatorTitle}>{info.label}</Text>
        </View>
        <View style={styles.statusSeparatorRight}>
          <Text style={styles.statusSeparatorCount}>{count}</Text>
          <Text style={styles.statusSeparatorToggle}>{isExpanded ? '🔼' : '🔽'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return {
    toggleSection,
    renderOrderStatusSeparator,
    renderTicketStatusSeparator,
    renderUserRoleSeparator
  };
};

// Logica per il rendering con separatori
export const useAdminRenderWithSeparators = (expandedSections, renderOrder, renderTicket, renderUser) => {
  const renderOrdersWithSeparators = (orders, renderOrderStatusSeparator, styles) => {
    const statusGroups = {};

    orders.forEach(order => {
      const status = String(order.status || '').toUpperCase();
      if (!statusGroups[status]) {
        statusGroups[status] = [];
      }
      statusGroups[status].push(order);
    });

    const statusInfo = {
      'PENDING': { label: 'In Attesa', icon: '⏳' },
      'CONFIRMED': { label: 'Confermati', icon: '✅' },
      'PREPARING': { label: 'In Preparazione', icon: '👨‍🍳' },
      'READY': { label: 'Pronti', icon: '📦' },
      'PICKUP': { label: 'Ritiro', icon: '📦' },
      'IN_TRANSIT': { label: 'In Viaggio', icon: '🚚' },
      'DELIVERED': { label: 'Consegnati', icon: '✅' },
      'CANCELLED': { label: 'Cancellati', icon: '❌' }
    };

    const result = [];

    Object.keys(statusGroups).forEach(status => {
      const groupOrders = statusGroups[status];
      const isExpanded = !!expandedSections[status];

      result.push(
        <View key={`separator-${status}`}>
          {renderOrderStatusSeparator(status, groupOrders.length, statusInfo[status] || { label: status, icon: '📋' }, isExpanded, styles)}
        </View>
      );

      if (isExpanded) {
        groupOrders.forEach(order => {
          result.push(
            <View key={`order-${order.id}`}>
              {renderOrder({ item: order })}
            </View>
          );
        });
      }
    });

    return result;
  };

  const renderTicketsWithSeparators = (tickets, renderTicketStatusSeparator, styles) => {
    const statusGroups = {};

    tickets.forEach(ticket => {
      const status = String(ticket.ticket_status || ticket.status || '').toUpperCase();
      if (!statusGroups[status]) {
        statusGroups[status] = [];
      }
      statusGroups[status].push(ticket);
    });

    const statusInfo = {
      'OPEN': { label: 'Aperti', icon: '🔓' },
      'IN_PROGRESS': { label: 'In Corso', icon: '⚙️' },
      'CLOSED': { label: 'Chiusi', icon: '✅' },
      'RESOLVED': { label: 'Risolti', icon: '🎯' }
    };

    const result = [];

    Object.keys(statusGroups).forEach(status => {
      const groupTickets = statusGroups[status];
      const isExpanded = !!expandedSections[status];

      result.push(
        <View key={`separator-${status}`}>
          {renderTicketStatusSeparator(status, groupTickets.length, statusInfo[status] || { label: status, icon: '📋' }, isExpanded, styles)}
        </View>
      );

      if (isExpanded) {
        groupTickets.forEach(ticket => {
          result.push(
            <View key={`ticket-${ticket.id}`}>
              {renderTicket({ item: ticket })}
            </View>
          );
        });
      }
    });

    return result;
  };

  const renderUsersWithSeparators = (users, renderUserRoleSeparator, styles) => {
    const roleGroups = {};

    users.forEach(user => {
      const role = String(user.role || '').toUpperCase();
      if (!roleGroups[role]) {
        roleGroups[role] = [];
      }
      roleGroups[role].push(user);
    });

    const roleInfo = {
      'CUSTOMER': { label: 'Clienti', icon: '👤' },
      'RIDER': { label: 'Rider', icon: '🚴' },
      'MANAGER': { label: 'Manager', icon: '👨‍💼' },
      'ADMIN': { label: 'Admin', icon: '👑' }
    };

    const result = [];

    Object.keys(roleGroups).forEach(role => {
      const groupUsers = roleGroups[role];
      const isExpanded = !!expandedSections[role];

      result.push(
        <View key={`separator-${role}`}>
          {renderUserRoleSeparator(role, groupUsers.length, roleInfo[role] || { label: role, icon: '👤' }, isExpanded, styles)}
        </View>
      );

      if (isExpanded) {
        groupUsers.forEach(user => {
          result.push(
            <View key={`user-${user.id}`}>
              {renderUser({ item: user })}
            </View>
          );
        });
      }
    });

    return result;
  };

  return {
    renderOrdersWithSeparators,
    renderTicketsWithSeparators,
    renderUsersWithSeparators
  };
};
