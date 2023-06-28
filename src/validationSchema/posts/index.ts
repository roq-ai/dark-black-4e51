import * as yup from 'yup';

export const postValidationSchema = yup.object().shape({
  content: yup.string().required(),
  topic_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
