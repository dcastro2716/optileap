import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem";

import styles from "assets/jss/nextjs-material-dashboard-pro/components/instructionStyle.js";

export default function InstructionText(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { title, text, className} = props;
  const instructionClasses = cx({
    [classes.instruction]: true,
    [className]: className !== undefined,
  });

  return (
    <div className={instructionClasses}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <p>{title}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <div className={classes.image}>
            {text}
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}

InstructionText.defaultProps = {

};

InstructionText.propTypes = {
  title: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
  className: PropTypes.string,
};
