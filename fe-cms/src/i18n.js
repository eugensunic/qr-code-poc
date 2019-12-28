import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      cro: {
        translations: {
          Overview: 'Pregled',
          'New content': 'Dodaj sliku',
          Admin: 'Admin',
          About: 'O stranici',
          Login: 'Prijava',
          Logout: 'Odjavi se',
          'Page does not exist': 'Stranica ne postoji',
          Close: 'Zatvori',
          'Change password': 'Promijeni lozinku',
          'Successful change': 'Uspješna promjena',
          'Current password': 'Trenutna lozinka',
          'New password': 'Nova lozinka',
          'Repeat password': 'Ponovi lozinku',
          'Confirm change': 'Potvrdi promjenu',
          'Forgot password': 'Zaboravljena lozinka',
          'Password successfully sent!': 'Lozinka uspješno poslana',
          'Send password to email': 'Pošalji lozinku na email',
          'Back to login': 'Povratak na Login',
          Register: 'Registriraj se',
          'Register new user': 'Registracija korisnika',
          'Successful registration!': 'Uspješna registracija',
          Submit: 'Potvrdi',
          'Your QR code was successfully stored to the database!':
            'Vaš QR kod je uspješno pohranjen u bazu podataka',
          'Image name:': 'Ime slike:',
          'Image name':'Ime slike',
          'Image description:': 'Opis slike:',
          'Image description':'Opis slike',
          'Current image:': 'Trenutna slika:',
          'Are you sure you want to delete the selected item?':
            'Jeste li sigurni da želite obrisati sliku?',
          'No content found': 'Nema sadržaja',
          'Visit page': 'Posjeti stranicu',
          Delete: 'Obriši',
          Edit: 'Izmjeni',
          'QR code': 'QR kod',
          'QR code for:': 'QR kod za sliku:',
          'First name': 'Ime',
          'Last name': 'Prezime',
          'Email address': 'Email adresa',
          Password: 'Lozinka',
          'Confirm password': 'Potvrdi lozinku',
          'Confirm registration': 'Potvrdi registraciju',
          'Choose file': 'Odaberi sliku',
          'search...': 'traži...'
        }
      }
    },
    fallbackLng: 'en',
    debug: true,

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
