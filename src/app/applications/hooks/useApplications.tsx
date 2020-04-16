import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEventsAsync } from 'data/event/action';

export const useApplications = (needEffect: boolean) => {
  const dispatch = useDispatch();

  const getApplications = useCallback(() => {
    dispatch(getEventsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (needEffect) getApplications();
  }, [needEffect, getApplications]);

  return getApplications;
};