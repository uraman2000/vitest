import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAddPatient from './useAddPatient';
import {
  ThemedDatePicker,
  ThemedInput,
  ThemedInputSelect,
  ThemedRadio,
} from '@/app/components/RootLayout/Themed/ThemedInput';
import ThemedTitle from '@/app/components/RootLayout/Themed/ThemedTitle';
import { BasePage } from '@/common/components';
import BaseButton from '@/common/components/button/BaseButton';

//* FC -------------------------------------------------------------------------
const PatientAddPage: React.FC = () => {
  const {
    age,
    calculateAge,
    citizenshipData,
    form,
    maritalStatusData,
    onFinishFailed,
    onFormFinish,
    onGetPatient,
    raceData,
    religion,
  } = useAddPatient();
  const navigate = useNavigate();
  return (
    <BasePage>
      <div className="px-52 pb-20">
        <ThemedTitle className="m-3" text="Patient Information" />

        <Form
          className="grid grid-cols-2 justify-items-start"
          form={form}
          onFinish={onFormFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex items-center justify-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="nric"
              rules={[{ required: true }]}
            >
              <ThemedInput
                id="nric"
                inputClassName="w-[238px]"
                isRequired
                label="NRIC"
              />
            </Form.Item>
            <BaseButton
              className="h-10 w-[114px]"
              onClick={() => onGetPatient()}
            >
              Lookup
            </BaseButton>
          </div>

          <Form.Item name="citizenship" rules={[{ required: true }]}>
            <ThemedInputSelect
              containerClassName="flex flex-col items-start"
              id="citizenship"
              inputClassName="w-[360px] h-[40px]"
              isRequired
              label="Citizenship"
              options={[
                { value: '', label: 'Select Organization' },
                ...(citizenshipData ?? []),
              ]}
              placeholder="Select Organization"
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="name"
              rules={[{ required: true }]}
            >
              <ThemedInput
                id="name"
                inputClassName="w-[360px]"
                isRequired
                label="Name"
              />
            </Form.Item>
          </div>

          <Form.Item name="maritalStatus">
            <ThemedInputSelect
              containerClassName="flex flex-col items-start"
              id="maritalstatus"
              inputClassName="w-[360px] h-[40px]"
              label="Marital Status"
              options={[
                {
                  value: '',
                  label: 'Select a marital status in the list or search',
                },
                ...(maritalStatusData ?? []),
              ]}
              placeholder="Select a marital status in the list or search"
            />
          </Form.Item>

          <Form.Item
            className="w-[360px]"
            name="gender"
            rules={[{ required: true }]}
          >
            <ThemedRadio
              containerClassName="flex-col items-start"
              id="gender"
              inputClassName="w-[360px] h-[40px] flex gap-28 items-center"
              isRequired
              label="Gender"
              options={[
                {
                  label: 'Female',
                  value: 'female',
                },
                {
                  label: 'Male',
                  value: 'male',
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="race">
            <ThemedInputSelect
              containerClassName="flex flex-col items-start"
              id="race"
              inputClassName="w-[360px] h-[40px]"
              label="Race"
              options={[
                {
                  value: '',
                  label: 'Select a race in the list or search',
                },
                ...(raceData ?? []),
              ]}
              placeholder="Select a race in the list or search"
            />
          </Form.Item>

          <Row className="gap-2">
            <Form.Item name="birthdate" rules={[{ required: true }]}>
              <ThemedDatePicker
                containerClassName="flex-col items-start"
                id="DOB"
                inputClassName="w-[256px]"
                isRequired
                label="Date of Birth"
                onChange={(e) => calculateAge(e)}
              />
            </Form.Item>

            <Form.Item>
              <ThemedInput
                // disabled
                id="age"
                inputClassName="w-[96px]"
                isRequired
                label="age"
                value={age}
              />
            </Form.Item>
          </Row>

          <Form.Item name="religion">
            <ThemedInputSelect
              containerClassName="flex flex-col items-start"
              id="religion"
              inputClassName="w-[360px] h-[40px]"
              label="Religion"
              options={[
                {
                  value: '',
                  label: 'Select a religion in the list or search',
                },
                ...(religion ?? []),
              ]}
              placeholder="Select a religion in the list or search"
            />
          </Form.Item>
          <div className="col-span-2">
            <ThemedTitle
              className="m-3"
              text="Patient’s Address (same as NRIC)"
            />
          </div>

          <div className="col-span-2 flex items-center justify-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="postalCode"
              rules={[{ required: true }]}
            >
              <ThemedInput
                id="postalCode"
                inputClassName="w-[360px]"
                isRequired
                label="Postal Code"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="blockLot"
              rules={[{ required: true }]}
            >
              <ThemedInput
                id="blockLot"
                inputClassName="w-[360px]"
                isRequired
                label="Block/Lot"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="street"
              rules={[{ required: true }]}
            >
              <ThemedInput
                id="street"
                inputClassName="w-[360px]"
                isRequired
                label="Street"
              />
            </Form.Item>
          </div>

          <div className="flex items-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="level"
              rules={[{ required: !form.getFieldValue('isLevelNA') }]}
            >
              <ThemedInput
                id="level"
                disabled={form.getFieldValue('isLevelNA')}
                inputClassName="w-[301px]"
                isRequired
                label="Level"
              />
            </Form.Item>
            <Form.Item
              className="flex items-center pt-6"
              name="isLevelNA"
              valuePropName="checked"
            >
              <Checkbox onChange={() => form.setFieldValue('level', '')}>
                N.A
              </Checkbox>
            </Form.Item>
          </div>

          <div className="flex items-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="unit"
              rules={[{ required: !form.getFieldValue('isUnitNA') }]}
            >
              <ThemedInput
                disabled={form.getFieldValue('isUnitNA')}
                id="unit"
                inputClassName="w-[301px]"
                isRequired
                label="Unit"
              />
            </Form.Item>
            <Form.Item
              className="flex items-center pt-6"
              name="isUnitNA"
              valuePropName="checked"
            >
              <Checkbox onChange={() => form.setFieldValue('unit', '')}>
                N.A
              </Checkbox>
            </Form.Item>
          </div>

          <ThemedTitle className="col-span-2 m-3" text="Contact Details" />

          <div className="flex items-center justify-center gap-2">
            <Form.Item
              className="flex flex-col"
              name="contactNumber"
              rules={[{ required: true }]}
            >
              <ThemedInput
                id="contactNumber"
                inputClassName="w-[360px]"
                isRequired
                label="Contact Number"
                type="number"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Form.Item className="flex flex-col" name="overseasPhone">
              <ThemedInput
                id="overseasPhone"
                inputClassName="w-[360px]"
                label="OverSeas Phone"
                type="number"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Form.Item className="flex flex-col" name="homePhone">
              <ThemedInput
                id="homePhone"
                inputClassName="w-[360px]"
                label="Home Phone"
                type="number"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Form.Item className="flex flex-col" name="email">
              <ThemedInput
                id="email"
                inputClassName="w-[360px]"
                label="Email"
                type="email"
              />
            </Form.Item>
          </div>

          <div className="fixed inset-x-0 bottom-8 flex items-center justify-end gap-2 bg-white py-4 pr-8 shadow-top">
            <BaseButton
              className="h-[38.8px]"
              htmlType="submit"
              icon={<PlusOutlined />}
            >
              Register Patient
            </BaseButton>

            <BaseButton
              className="h-[38.8px]"
              onClick={() => navigate(-1)}
              type="outline"
            >
              Cancel
            </BaseButton>
          </div>
        </Form>
      </div>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAddPage;