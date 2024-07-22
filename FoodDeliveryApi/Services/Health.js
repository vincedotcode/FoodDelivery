import HealthRecord from '../Models/HealthModel.js';
import Medication from '../Models/Medication.js';
import PhysicalRecord from '../Models/PhysicalRecord.js';

export const getHealthRecordsByUserId = async (userId) => {
  return await HealthRecord.find({ user_id: userId }).populate('doctor_id');
};

export const getMedicationsByUserId = async (userId) => {
  return await Medication.find({ user_id: userId }).populate('prescribed_by');
};

export const getPhysicalRecords = async (userId) => {
  return await PhysicalRecord.find({ user_id: userId });
};
