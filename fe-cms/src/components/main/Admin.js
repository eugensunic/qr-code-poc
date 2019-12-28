import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import Register from './Register';

function AdminPage() {
  const [openTab, setOpenTab] = useState(0);
  return (
    <>
      <div className="tabWrapper">
        <button onClick={_ => setOpenTab(0)}>Change password</button>
        <button onClick={_ => setOpenTab(1)}>Register new user</button>
        {openTab === 0 ? <ChangePassword /> : <Register />}
      </div>
    </>
  );
}
// change password, add user
export default AdminPage;
