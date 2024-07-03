import React, { memo } from "react";

const NavbarItem = memo(({ render, href, label }) => {
  if (!render) {
    return null;
  }

  return (
    <li className="nav-item">
      <a className="nav-link" href={href}>
        {label}
      </a>
    </li>
  );
});

export default NavbarItem;
