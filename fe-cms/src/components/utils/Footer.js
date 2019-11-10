import React from 'react';

function Footer() {
  return (
    <div id="footer">
      <ul>
        <li>
          <span className="protected-route">red links</span>
        </li>
        <li>
          <span className="unprotected-route">blue links</span>
        </li>
        <li>login mocked (no backend, passwords unhashed),</li>
        <li>
          reload deletes all your states, login remains unless localStorage
          deleted
        </li>
      </ul>
    </div>
  );
}

export default Footer;
