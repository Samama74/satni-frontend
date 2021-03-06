import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Trans } from '@lingui/macro';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { wantedLangsVar } from 'apolloCache';

const useStyles = makeStyles(theme => ({
  lang1: {
    marginRight: theme.spacing(1),
    float: 'right'
  },
  lang2: {
    marginLeft: theme.spacing(1)
  },
  check: {
    margin: 0,
    padding: 0
  }
}));

const PairHeader = (props) => {
  const {langpair} = props;
  const classes = useStyles();
  const wantedLangs = wantedLangsVar();

  const handleChange = (event) => {
    event.stopPropagation();
    wantedLangsVar(wantedLangs.filter(value => value !== event.target.name));
  };

  return (
    <Grid container>
      <Grid
        item
        xs={5}
      >
        <FormControlLabel
          className={classes.lang1}
          label={<Typography
            variant='subtitle2'
          ><Trans id={langpair.slice(0, 3)} /></Typography>}
          control={
            <Checkbox
              checked
              className={classes.check}
              color='default'
              name={langpair.slice(0, 3)}
              onChange={handleChange}
            />
          }
        />
      </Grid>
      <Grid item><Typography variant='subtitle2'
      >⟹</Typography></Grid>
      <Grid
        item
        xs={5}
      >
        <FormControlLabel
          className={classes.lang2}
          label={<Typography
            variant='subtitle2'
          ><Trans id={langpair.slice(3)} /></Typography>}
          control={
            <Checkbox
              checked
              className={classes.check}
              color='default'
              name={langpair.slice(3)}
              onChange={handleChange}
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default PairHeader;
