import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

export const difficultyMarks = [
  {
    value: 0,
    label: 'Easy',
  },
  {
    value: 5,
    label: 'Medium',
  },
  {
    value: 10,
    label: 'Hard',
  }
];

export function valuetext(value) {
  return `${value}`;
}
