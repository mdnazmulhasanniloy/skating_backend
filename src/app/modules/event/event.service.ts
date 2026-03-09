import prisma from '@app/shared/prisma'
import AppError from '@app/error/AppError'
import httpStatus from 'http-status'

const createEvent = async (payload:any) => {
  const result = await prisma.event.create({
    data: payload
  })

  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST,"Failed to create event")
  }

  return result
}

export const eventService = {
  createEvent
}