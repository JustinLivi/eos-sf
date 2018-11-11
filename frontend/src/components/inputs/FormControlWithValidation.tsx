import * as React from 'react';
import { FormControl } from 'react-bootstrap';

import { withValidation } from '../withValidation';

export const FormControlWithValidation = withValidation(FormControl);