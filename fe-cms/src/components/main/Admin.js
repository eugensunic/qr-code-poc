import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import Register from './Register';
import { useTranslation } from 'react-i18next';

function AdminPage() {
  const [openTab, setOpenTab] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <div className="tabWrapper">
        <button onClick={_ => setOpenTab(0)}>{t('Change password')}</button>
        <button onClick={_ => setOpenTab(1)}>{t('Register new user')}</button>
        {openTab === 0 ? <ChangePassword /> : <Register />}
      </div>
    </>
  );
}
// change password, add user
export default AdminPage;
