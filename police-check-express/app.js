import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './openapi.json' assert { type: 'json' };

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const citizenData = [
  {
    id: '992383845V',
    first_name: 'Pratheek',
    last_name: 'Senevirathne',
    dob: '1999-08-26',
    gender: 'M',
    address: '200/4, 1st Lane, Rajagiriya',
    criminalCaseExist: false,
    criminalCaseRecord: '',
  },
  {
    id: '990012912V',
    first_name: 'Jolene',
    last_name: 'Robelin',
    dob: '1999-07-20',
    gender: 'F',
    address: '587 Prairieview Plaza',
    criminalCaseExist: true,
    criminalCaseRecord: 'Some criminal activity...',
  },
  {
    id: '995619139V',
    first_name: 'Angy',
    last_name: 'Boulter',
    dob: '1999-07-06',
    gender: 'F',
    address: '4 Ramsey Circle',
    criminalCaseExist: false,
    criminalCaseRecord: '',
  },
  {
    id: '992939283V',
    first_name: 'Elton',
    last_name: 'Barenskie',
    dob: '1999-12-30',
    gender: 'M',
    address: '38712 Northfield Park',
    criminalCaseExist: true,
    criminalCaseRecord: 'Some criminal activity...',
  },
  {
    id: '994789346V',
    first_name: 'Anette',
    last_name: 'Comisid',
    dob: '1999-01-02',
    gender: 'F',
    address: '8 Cordelia Lane',
    criminalCaseExist: false,
    criminalCaseRecord: '',
  },
  {
    id: '991777277V',
    first_name: 'Drew',
    last_name: 'Fowle',
    dob: '1999-04-07',
    gender: 'M',
    address: '3 Algoma Way',
    criminalCaseExist: false,
    criminalCaseRecord: '',
  },
];

app.get('/api/policeRecords', (_, res) => {
  return res.json(citizenData);
});

app.get('/api/policeRecord/:id', (req, res) => {
  const id = req.params.id;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid id' });
  }

  const citizen = citizenData.find((c) => c.id === id);

  if (!citizen) {
    return res.status(404).json({ error: 'Police record not found' });
  }
  return res.json(citizen);
});

app.get('/', (_, res) => {
  return res.json({ status: 'Police check api is running /api' });
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500);
  res.json({ error: err.message });
});

app.use('*', (_, res) => {
  return res
    .status(404)
    .json({ error: 'the requested resource does not exist on this server' });
});

export default app;
