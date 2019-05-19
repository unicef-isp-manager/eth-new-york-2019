import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  header: {
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '31px',
    lineHeight: '10px',
  },
  title: {
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '22px',
  },
  link: {
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
    textDecoration: 'none',
    color: '#000000',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  text: {
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
  },
  textGray: {
    marginRight: '57px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '18px',
    color: '#828282',
  },
});

const ModalInfo = ({ classes, content }) => (
  <span className={classes.body}>
    { content && content.content && content.content.map && content.content.map(c => (
      <span key={c.id}>
        { c.header && <p className={classes.header}>{c.header}</p> }
        { c.titleLink && <p><a href={c.href} className={classes.link}>{c.titleLink}</a></p> }
        { c.title && <p className={classes.title}>{c.title}</p> }
        { c.content && <p className={classes.text}>{c.content}</p> }
        { c.emailLink && <a href={c.href} className={classes.link}>{c.emailLink}</a> }
        { c.contentGray && <p className={classes.textGray}>{c.contentGray}</p> }
      </span>
    ))
    }
  </span>
);

ModalInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  content: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ModalInfo);
