import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteMap } from '@/configs';
import { useGetMockDataQuery } from '@/services/Lookups/LookupService';
import {
  useCreatePatientMutation,
  useLazyGetPatientByNricQuery,
} from '@/services/Patient/PatientService';

const useAddPatient = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [age, setAge] = useState<number>(0);

  const [getPatient, { data }] = useLazyGetPatientByNricQuery();
  const { data: citizenshipData } = useGetMockDataQuery('Citizenship');
  const { data: maritalStatusData } = useGetMockDataQuery('MaritalStatus');
  const { data: raceData } = useGetMockDataQuery('Race');
  const { data: religion } = useGetMockDataQuery('Religion');

  const [createPatient, { isSuccess: isCreatePatientSuccess }] =
    useCreatePatientMutation();

  // Handle form submission
  const onFormFinish = (values: any) => {
    const formatValue = (data: any, key: any) => {
      const item = (data ?? []).find(
        (entry: any) => entry.value === values[key],
      );
      return item ? { code: item.value, display: item.label } : null;
    };

    const formattedValues = {
      ...values,
      citizenship: formatValue(citizenshipData, 'citizenship'),
      maritalStatus: formatValue(maritalStatusData, 'maritalStatus'),
      race: formatValue(raceData, 'race'),
      religion: formatValue(religion, 'religion'),
    };

    createPatient(formattedValues);
  };

  // Handle patient lookup
  const onGetPatient = () => {
    form.validateFields(['nric']).then((values: any) => {
      getPatient(values.nric);
    });
  };

  // Calculate age based on birthdate
  const calculateAge = (e: any) => {
    if (e) {
      const birthday = new Date(e);
      const ageMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageMs);
      const years = Math.abs(ageDate.getUTCFullYear() - 1970);
      setAge(years);
    } else {
      setAge(0);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        active: data.active,
        gender: data.gender,
        birthdate: dayjs(data.birthdate),
        maritalStatus: data.maritalStatus,
        idType: data.idType,
        idNumber: data.idNumber,
        contactNumber: data.contactNumber,
        email: data.email,
      });
      calculateAge(dayjs(data.birthdate));
    }
  }, [data, form]);

  useEffect(() => {
    if (isCreatePatientSuccess) {
      message.success('Patient registered successfully.');
      navigate(RouteMap.RootPath);
    }
  }, [isCreatePatientSuccess, navigate]);

  const onFinishFailed = () => {
    const firstError = document.querySelector(.ant-form-item-has-error);
    if (firstError) {
      window.scrollTo({
        top: (firstError as HTMLElement).offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };
  return {
    form,
    citizenshipData,
    maritalStatusData,
    raceData,
    religion,
    age,
    onFormFinish,
    onGetPatient,
    onFinishFailed,
    calculateAge,
  };
};

export default useAddPatient;

