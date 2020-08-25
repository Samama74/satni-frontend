import React from 'react';
import { Trans } from '@lingui/macro';
import { useCookies } from 'react-cookie';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';

import { availableLanguages } from 'utils';

const LangChooser = () => {
  const [cookies, setCookie] = useCookies(['wantedLangs']);
  const samiLanguages = new Set(['sma', 'sme', 'smj', 'smn', 'sms']);

  const handleChange = (event) => {
    const oldLangs = cookies.wantedLangs;
    const newLangs = oldLangs.includes(event.target.name) ?
      oldLangs.filter(value => value !== event.target.name) :
      [...oldLangs, event.target.name];
    setCookie('wantedLangs', newLangs);
  };

  return (
    <Grid container>
      <Grid item
        xs={6}>
        <FormGroup row>
          {availableLanguages
            .filter(lang => samiLanguages.has(lang))
            .map(lang => (
              <FormControlLabel
                key={lang}
                control={
                  <Checkbox
                    color='default'
                    checked={cookies.wantedLangs.includes(lang)}
                    onChange={handleChange}
                    name={lang}
                  />
                }
                label={<Trans id={lang} />}
              />
            ))}
        </FormGroup>
      </Grid>
      <Grid item
        xs={6}>
        <FormGroup row>
          {availableLanguages
            .filter(lang => !samiLanguages.has(lang))
            .map(lang => (
              <FormControlLabel
                key={lang}
                control={
                  <Checkbox
                    color='default'
                    checked={cookies.wantedLangs.includes(lang)}
                    onChange={handleChange}
                    name={lang}
                  />
                }
                label={<Trans id={lang} />}
              />
            ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default LangChooser;