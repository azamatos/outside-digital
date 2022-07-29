const tokenResponse = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwMGMyMjljLTdjMmMtNGNiMC04ZDk1LWMyOGIzZDBkZDNmYSIsImlhdCI6MTY1OTA3NjU0MCwiZXhwIjoxNjU5MDc4MzQwfQ.ijEOgAiTAAvf46h_Z3RgVDG0-942mddVB9D0tZjONsY',
  expire: 1800,
};

const userWithTags = {
  email: 'example@exe.com',
  nickname: 'example',
  tags: [
    {
      id: 'id',
      name: 'example',
      sortOrder: '0',
    },
  ],
};

const userTags = {
  tags: [
    {
      id: 1,
      name: 'example',
      sortOrder: '0',
    },
    {
      id: 2,
      name: 'example',
      sortOrder: '0',
    },
    {
      id: 3,
      name: 'example',
      sortOrder: '0',
    },
  ],
};

const newTagResponse = {
  id: 'id',
  name: 'example',
  sortOrder: '0',
};

const loginResponse = {
  email: '15457akdepe@gmail.com',
  password: 'Digital2022',
};

const userTagResponse = {
  creator: {
    nickname: 'example',
    uid: 'exam-pl-eUID',
  },
  name: 'example',
  sortOrder: '0',
};

const userOwnTags = {
  data: [
    {
      creator: {
        nickname: 'example',
        uid: 'exam-pl-eUID',
      },
      name: 'example',
      sortOrder: '0',
    },
    {
      creator: {
        nickname: 'example',
        uid: 'exam-pl-eUID',
      },
      name: 'example',
      sortOrder: '0',
    },
  ],
  meta: {
    offset: 10,
    length: 10,
    quantity: 100,
  },
};

const tagUpdateResponse = {
  creator: {
    nickname: 'example',
    uid: 'exam-pl-eUID',
  },
  name: 'example',
  sortOrder: '0',
};

const successMessage = { message: 'Success' };

const schemaExamples = {
  tokenResponse,
  userWithTags,
  loginResponse,
  successMessage,
  userTags,
  newTagResponse,
  userTagResponse,
  userOwnTags,
  tagUpdateResponse,
};

export default schemaExamples;
