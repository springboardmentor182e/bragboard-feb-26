# 🔔 ADMIN NOTIFICATION SYSTEM - COMPLETE IMPLEMENTATION

## Overview
Admin receives real-time notifications for:
1. **New user signups** (pending approval)
2. **Reported shoutouts** (unresolved reports)

Both notifications appear on the bell icon and redirect to appropriate pages.

---

## 🔄 NOTIFICATION FLOW

### **Step 1: User Reports a Shoutout** 
- Employee goes to any shoutout and clicks "Report"
- Report is created in database with:
  - `status: "PENDING"` (default)
  - `reason`: Why they reported it
  - `description`: Details
  - `created_at`: Timestamp
  - `priority`: LOW/MEDIUM/HIGH

### **Step 2: Admin Dashboard Stats Updated**
**Backend:** `server/src/admin/service.py`
- `get_dashboard_stats()` method now returns:
  - `pending_users`: Count of users with status "Pending"
  - `unresolved_reports`: Count of reports with status NOT "RESOLVED"

```python
# Get unresolved reports
unresolved_reports = self.db.query(Report).filter(
    Report.status != "RESOLVED"
).count()
```

### **Step 3: Frontend Fetches Notifications**
**Frontend:** `client/src/features/admin-dash/components/layout/AdminTopbar.jsx`
- Every 30 seconds, fetches dashboard stats
- Gets both `pending_users` and `unresolved_reports`
- Calculates total notifications

```javascript
const fetchNotifications = async () => {
  const res = await adminAPI.getDashboardStats();
  setPendingUsers(res.data?.pending_users || 0);
  setUnresolvedReports(res.data?.unresolved_reports || 0);
};

const interval = setInterval(fetchNotifications, 30000); // 30 seconds
```

### **Step 4: Bell Icon Updates**
- Shows red badge with count
- Animates with `animate-pulse`
- Tooltip shows breakdown: "X pending user(s) • Y unresolved report(s)"

```
🔔 [9+] ← Shows total notifications
```

### **Step 5: Admin Clicks Bell Icon**
**Smart Navigation Logic:**
- If pending users > 0 → Redirect to `/admin/employees`
  - Admin approves new signups
- If pending users = 0 BUT unresolved reports > 0 → Redirect to `/admin/reports`
  - Admin resolves reported shoutouts
- If both = 0 → No notification (bell is gray)

```javascript
const handleNotificationClick = () => {
  if (pendingUsers > 0) {
    navigate("/admin/employees");  // Approve users
  } else if (unresolvedReports > 0) {
    navigate("/admin/reports");    // Resolve reports
  }
};
```

### **Step 6: Admin Resolves Issue**

**For Pending Users:**
- Click on user in employee management
- Click "Approve" button
- User status changes from "Pending" → "Active"
- Notification count decreases automatically on next refresh

**For Reported Shoutouts:**
- Admin goes to Reports page
- Reviews the reported shoutout
- Clicks "Resolve" or "Archive" shoutout
- Report status changes from "PENDING" → "RESOLVED"
- Notification count decreases automatically on next refresh

---

## 📱 UI/UX Details

### **Notification Bell States:**

**State 1: No Notifications**
```
🔔 (gray) - No badge
Hover: "No pending notifications"
Click: Does nothing
```

**State 2: Pending Users Only**
```
🔔 [3] (yellow) - Badge shows 3
Hover: "3 pending user(s) • 0 unresolved report(s)"
Click: Goes to /admin/employees
```

**State 3: Unresolved Reports Only**
```
🔔 [5] (yellow) - Badge shows 5
Hover: "0 pending user(s) • 5 unresolved report(s)"
Click: Goes to /admin/reports
```

**State 4: Both Exist**
```
🔔 [8] (yellow) - Badge shows 8 (3 users + 5 reports)
Hover: "3 pending user(s) • 5 unresolved report(s)"
Click: Goes to /admin/employees (prioritized)
```

### **Badge Styling:**
- Red color: `bg-red-500`
- Animated pulse: `animate-pulse`
- Max display: "9+" if more than 9 notifications
- Border: `border-2 border-white` (stands out)

---

## 🔧 Backend Implementation

### **Modified Files:**

**`server/src/admin/service.py`**
- Added `get_unresolved_reports_count()` method
- Updated `get_dashboard_stats()` to return `unresolved_reports`
- Real-time query against Report table

```python
def get_unresolved_reports_count(self) -> int:
    """Get count of unresolved reports for notifications"""
    from ..entities.report import Report
    count = self.db.query(Report).filter(
        Report.status != "RESOLVED"
    ).count()
    return count
```

### **Database Queries:**

**Query 1: Pending Users**
```sql
SELECT COUNT(*) FROM users WHERE status = 'Pending'
```

**Query 2: Unresolved Reports**
```sql
SELECT COUNT(*) FROM reports WHERE status != 'RESOLVED'
```

---

## 🖥️ Frontend Implementation

### **Modified Files:**

**`client/src/features/admin-dash/components/layout/AdminTopbar.jsx`**
- Added `unresolvedReports` state
- Changed refresh interval from 5 min to 30 seconds (real-time)
- Smart navigation based on notification type
- Enhanced tooltip with both metrics

### **Key Changes:**
1. Track both `pendingUsers` and `unresolvedReports`
2. Calculate `totalNotifications = pendingUsers + unresolvedReports`
3. Show badge only if `totalNotifications > 0`
4. Redirect based on which notification type exists

---

## ⏱️ Real-Time Updates

**Refresh Rate:** 30 seconds (can be changed)
- Current: `setInterval(fetchNotifications, 30000)`
- Benefits: Real-time feel while minimizing server load
- Can be reduced to 10-15 seconds if more real-time is needed

**Data Freshness:**
- When admin approves user → Status updates immediately
- When admin resolves report → Status updates immediately
- Next notification fetch (30 sec) shows updated count

---

## 🔍 Testing the Flow

### **Test Case 1: New User Signup**
1. Employee signs up (status: Pending)
2. Admin sees notification bell increase
3. Admin clicks bell → Goes to /admin/employees
4. Admin approves user
5. Notification count decreases on next refresh

### **Test Case 2: New Reported Shoutout**
1. Employee reports a shoutout
2. Report created with status: PENDING
3. Admin sees notification bell increase
4. Admin clicks bell → Goes to /admin/reports
5. Admin resolves/archives the report
6. Notification count decreases on next refresh

### **Test Case 3: Both Exist**
1. 2 pending users + 3 unresolved reports
2. Bell shows "5" (total)
3. Tooltip shows "2 pending user(s) • 3 unresolved report(s)"
4. Admin approves 1 user
5. Next refresh shows "4" total (1 pending + 3 reports)
6. Bell still redirects to employees (prioritized)

---

## 📝 API Endpoints Used

### **Frontend → Backend:**
```
GET /api/admin/dashboard-stats
Response:
{
  "pending_users": 2,
  "unresolved_reports": 5,
  "total_users": 45,
  "total_posts": 120,
  "total_reactions": 450,
  ...
}
```

### **Admin Actions:**
```
POST /api/admin/users/{user_id}/approve
Response: { "status": "Active" }

POST /api/admin/reports/{report_id}/resolve
Response: { "status": "RESOLVED" }
```

---

## ✅ Status: COMPLETE

**Backend:**
- ✅ Dashboard stats returns both metrics
- ✅ Real-time count queries

**Frontend:**
- ✅ Dual notification tracking
- ✅ Smart navigation
- ✅ 30-second refresh (real-time feel)
- ✅ Improved tooltip
- ✅ Responsive badge display

**User Experience:**
- ✅ Clear notification badge
- ✅ Context-aware navigation
- ✅ Real-time updates
- ✅ No manual refreshing needed

---

## 🚀 How to Use

1. **Admin logs in** → Opens admin dashboard
2. **Bell shows notifications** → Red badge with count
3. **Admin hovers on bell** → Sees breakdown of notifications
4. **Admin clicks bell** → Redirected to appropriate page
5. **Admin acts** (approve user or resolve report)
6. **Notification updates** → On next 30-second refresh

Simple, intuitive, and effective! 🎉
