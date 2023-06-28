import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTopicById, updateTopicById } from 'apiSdk/topics';
import { Error } from 'components/error';
import { topicValidationSchema } from 'validationSchema/topics';
import { TopicInterface } from 'interfaces/topic';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { AdminInterface } from 'interfaces/admin';
import { getAdmins } from 'apiSdk/admins';

function TopicEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TopicInterface>(
    () => (id ? `/topics/${id}` : null),
    () => getTopicById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TopicInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTopicById(id, values);
      mutate(updated);
      resetForm();
      router.push('/topics');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TopicInterface>({
    initialValues: data,
    validationSchema: topicValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Topic
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="date" mb="4">
              <FormLabel>Date</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.date ? new Date(formik.values?.date) : null}
                  onChange={(value: Date) => formik.setFieldValue('date', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <AsyncSelect<AdminInterface>
              formik={formik}
              name={'admin_id'}
              label={'Select Admin'}
              placeholder={'Select Admin'}
              fetcher={getAdmins}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'topic',
  operation: AccessOperationEnum.UPDATE,
})(TopicEditPage);
