import debug from 'debug';
import express from 'express';

export const createApp = () => {
  debug('Creating app');
  return express();
};
