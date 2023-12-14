import React from 'react';
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Your Website Name. All Rights Reserved.</p>
    </footer>
  );
}
