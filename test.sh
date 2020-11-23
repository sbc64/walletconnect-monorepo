#!/usr/bin/env bash
while [ true ]; do
  STRESS_TEST=1 npm run health-check &
  #STRESS_TEST=1 npm run health-check https://localhost &
  #STRESS_TEST=1 npm run health-check https://testbridge.walletconnect.org &
  sleep 5
done
