import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, PageSidebar, NavList } from "@patternfly/react-core";
import { LayoutTheme } from "../LayoutUtils";

import { Paths } from "Paths";

export const SidebarApp: React.FC = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme={LayoutTheme}>
        <NavList>
          <NavItem>
            <NavLink to={Paths.companies} activeClassName="pf-m-current">
              Companies
            </NavLink>
          </NavItem>
          <NavItem>Documents</NavItem>
        </NavList>
      </Nav>
    );
  };

  return <PageSidebar nav={renderPageNav()} theme={LayoutTheme} />;
};