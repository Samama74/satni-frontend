import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

import { fetchParadigms } from 'features/paradigm/paradigmsSlice';
import { stemToKey } from 'utils';

const ParadigmButton = ({lemma, language, pos, onClick, classes}) => {
  const paradigmLangs = new Set(['sme', 'sma', 'smn', 'sms', 'smj', 'fin']);
  const paradigmPos = new Set(['N', 'V', 'Adj']);
  const paradigms = useSelector(state => state['paradigms']);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParadigms({lemma, pos, language}));
  }, [dispatch, lemma, pos, language]);

  if (
    paradigmLangs.has(language) &&
    paradigmPos.has(pos) &&
    paradigms &&
    paradigms[stemToKey({lemma, pos, language})]) {
    return <IconButton
      className={classes.icons}
      component='span'
      aria-label='Paradigm'
      onClick={onClick}
      color='primary'
    >
      <InfoOutlined />
    </IconButton>;
  }

  return <IconButton
    disabled
    className={classes.icons}
    component='span'
    aria-label='Paradigm'
    onClick={onClick}
    color='primary'
  >
    <InfoOutlined />
  </IconButton>
  ;
};

export default ParadigmButton;
