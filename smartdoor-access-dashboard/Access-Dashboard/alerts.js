const alerts = [
  {
    id: "A-101",
    location: "D-101",
    status: "Locked",
    timestamp: "2025-07-28T08:15",
    triggeredBy: "AccessRequest 2003, 2004, 2005"
  },
  {
    id: "A-102",
    location: "D-103",
    status: "Locked",
    timestamp: "2025-07-28T09:20",
    triggeredBy: "AccessRequest 2009, 2010, 2011"
  }
];

const tbody = document.querySelector('#alerts-table tbody');
alerts.forEach(alert => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${alert.id}</td><td>${alert.location}</td><td>${alert.status}</td><td>${alert.timestamp}</td><td>${alert.triggeredBy}</td>`;
  tbody.appendChild(row);
});