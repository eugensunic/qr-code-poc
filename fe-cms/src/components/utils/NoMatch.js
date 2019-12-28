import React from 'react';
import { useTranslation } from 'react-i18next';


function NoMatch() {
  const { t } = useTranslation();

  return <div>{t('Page does not exist')}</div>;
}

export default NoMatch;
