import * as meetingRepository from './meetings.repository.js';

export async function scheduleMeeting(partnerId, clientId, startTime) {
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + 30);
  return await meetingRepository.createMeeting(partnerId, clientId, startTime, endTime);
}

export async function getUserMeetings(userId) {
  return await meetingRepository.getMeetingsByUser(userId);
}
