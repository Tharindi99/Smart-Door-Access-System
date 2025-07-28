const logs = [
  { timestamp: "2025-07-28T08:00", doorId: "D-101", userId: 101, requestId: 2001, policyDoorAccessId: 501, result: "success", isGuest: false },
  { timestamp: "2025-07-28T08:05", doorId: "D-101", userId: 201, requestId: 2002, policyDoorAccessId: 502, result: "success", isGuest: true },
  { timestamp: "2025-07-28T08:10", doorId: "D-101", userId: 201, requestId: 2003, policyDoorAccessId: 502, result: "fail", isGuest: true },
  { timestamp: "2025-07-28T08:15", doorId: "D-101", userId: 201, requestId: 2004, policyDoorAccessId: 502, result: "fail", isGuest: true },
  { timestamp: "2025-07-28T08:15", doorId: "D-101", userId: 201, requestId: 2005, policyDoorAccessId: 502, result: "fail", isGuest: true },
  { timestamp: "2025-07-28T08:20", doorId: "D-102", userId: 101, requestId: 2006, policyDoorAccessId: 503, result: "success", isGuest: false },
  { timestamp: "2025-07-28T09:00", doorId: "D-101", userId: 102, requestId: 2007, policyDoorAccessId: 504, result: "success", isGuest: false },
  { timestamp: "2025-07-28T09:05", doorId: "D-101", userId: 202, requestId: 2008, policyDoorAccessId: 505, result: "success", isGuest: true },
  { timestamp: "2025-07-28T09:10", doorId: "D-103", userId: 103, requestId: 2009, policyDoorAccessId: 501, result: "fail", isGuest: false },
  { timestamp: "2025-07-28T09:15", doorId: "D-103", userId: 103, requestId: 2010, policyDoorAccessId: 501, result: "fail", isGuest: false },
  { timestamp: "2025-07-28T09:20", doorId: "D-103", userId: 103, requestId: 2011, policyDoorAccessId: 501, result: "fail", isGuest: false },
];

const tbody = document.querySelector('#logs-table tbody');

// Count failed attempts per door
const failedCounts = {};
logs.forEach(log => {
  if (log.result === "fail") {
    failedCounts[log.doorId] = (failedCounts[log.doorId] || 0) + 1;
  }
});

// Render table
logs.forEach(log => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${log.timestamp}</td>
    <td>${log.doorId}</td>
    <td>${log.userId}</td>
    <td>${log.requestId}</td>
    <td>${log.result}</td>
    <td>${log.isGuest ? "Yes" : "No"}</td>
  `;
  if (log.result === "fail" && failedCounts[log.doorId] >= 3) {
    row.style.color = "red";
    row.title = "Security Alert Triggered!";
  }
  tbody.appendChild(row);
});