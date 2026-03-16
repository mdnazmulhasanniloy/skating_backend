
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from './app/error/AppError';
import { paginationHelper } from './app/helpers/pagination.helpers';
import prisma from './app/shared/prisma';
import pickQuery from './app/utils/pickQuery';
import { Prisma } from '@prisma/index';
import httpStatus from 'http-status'; 


//Create Function
const createEvents = async (payload:Prisma.EventsCreateInput) => {
  const result = await prisma.events.create({
      data: payload,
    });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create events');
  }
  return result;
};

/*
get all function
*/
const getAllEvents = async (query: Record<string, any>) => {
 query.isDeleted = false;
  const { filters, pagination } = await pickQuery(query);
  const { searchTerm, ...filtersData } = filters;

    const where: Prisma.EventsWhereInput = {};

    /*
    * enter here search input filed
    */
     if (searchTerm) {
    where.OR = [].map(field => ({
      [field]: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }));
  }


    // Filter conditions
  if (Object.keys(filtersData).length > 0) {
    const oldAnd = where.AND;
    const andArray = Array.isArray(oldAnd) ? oldAnd : oldAnd ? [oldAnd] : [];

    where.AND = [
      ...andArray,
      ...Object.entries(filtersData).map(([key, value]) => ({
        [key]: { equals: value },
      })),
    ];
  }


  // Pagination & Sorting
    const { page, limit, skip, sort } =
      paginationHelper.calculatePagination(pagination);
  
    const orderBy: Prisma.EventsOrderByWithRelationInput[] = sort
      ? sort.split(',').map(field => {
          const trimmed = field.trim();
          if (trimmed.startsWith('-')) {
            return { [trimmed.slice(1)]: 'desc' };
          }
          return { [trimmed]: 'asc' };
        })
      : [];



       try {
    // Fetch data
    const data = await prisma.events.findMany({
      where,
      skip,
      take: limit,
      orderBy,
    });

    const total = await prisma.events.count({ where });

    return {
      data,
      meta: { page, limit, total },
    };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }




};

const getEventsById = async (id: string) => {

 try {
    const result = await prisma.events.findUnique({
      where: {
        id,
      },
    });

     if (!result || result?.isDeleted) 
    throw new Error('Events not found!');
  

    return result;
  } catch (error: any)  {
   
  throw new AppError(httpStatus.BAD_REQUEST, error?.message);
  }
   
};



// update 
const updateEvents = async (id: string, payload:Prisma.EventsUpdateInput ) => {
 const result = await prisma.events.update({
      where: {
        id,
      },
      data: payload,
    });

    if (!result) 
      throw new Error('Failed to update Events');
    

    return result; 
};

const deleteEvents = async (id: string) => {

 const result = await prisma.events.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

 
  if (!result) 
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete events');
 
  return result;
};

export const eventsService = {
  createEvents,
  getAllEvents,
  getEventsById,
  updateEvents,
  deleteEvents,
};