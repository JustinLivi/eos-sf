import * as React from 'react';

import { withValidation } from '../withValidation';

export const TextWithValidation = withValidation(({ value }) => <div>{value}</div>);