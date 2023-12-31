import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  YouTube as YoutubeIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  People as PeopleIcon,
  Map as MapIcon,
  VideoLibrary as VideoIcon,
  Movie as MovieIcon,
  Person as PersonIcon
  
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "Users", link: "/app/users", icon: <PeopleIcon /> },
  // {id: 2,label: "Channels",link: "/app/channels",icon: <YoutubeIcon />},
  {id: 3,label: "TV Series",link: "/app/tv",icon: <VideoIcon />},
  {id: 4,label: "Films", link: "/app/films",icon: <MovieIcon />},
  {id: 5,label: "Maps",link: "/app/ui/maps",icon: <MapIcon />},
  {id: 6,label: "Profile",link: "/app/profile",icon: <PersonIcon />},
  { id: 7, type: "divider" },
  { id: 8, type: "title", label: "HELP" },
  { id: 9, label: "About Us", link: "#", icon: <LibraryIcon /> },
  { id: 10, label: "Contact", link: "#", icon: <SupportIcon /> },
  { id: 11, label: "FAQ", link: "#", icon: <FAQIcon /> }
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
