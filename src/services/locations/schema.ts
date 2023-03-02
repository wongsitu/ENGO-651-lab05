import { z } from 'zod';

export const LocationsSchema = z.object({
  type: z.string().nullable().optional(),
  features: z.array(
    z.object({
      type: z.string().nullable().optional(),
      geometry: z
        .object({
          type: z.string().nullable().optional(),
          coordinates: z.array(z.number()).nullable().optional(),
        })
        .nullable()
        .optional(),
      properties: z.object({
        applieddate: z.string().nullable().optional(),
        locationState: z.string().nullable().optional(),
        locationZip: z.string().nullable().optional(),
        totalsqft: z.string().nullable().optional(),
        permitclassmapped: z.string().nullable().optional(),
        latitude: z.string().nullable().optional(),
        workclassgroup: z.string().nullable().optional(),
        contractorname: z.string().nullable().optional(),
        permitclassgroup: z.string().nullable().optional(),
        issueddate: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        permitnum: z.string().nullable().optional(),
        locationsgeojson: z.string().nullable().optional(),
        permittype: z.string().nullable().optional(),
        communitycode: z.string().nullable().optional(),
        locationAddress: z.string().nullable().optional(),
        estprojectcost: z.string().nullable().optional(),
        permitclass: z.string().nullable().optional(),
        statuscurrent: z.string().nullable().optional(),
        locationCity: z.string().nullable().optional(),
        locationcount: z.string().nullable().optional(),
        permittypemapped: z.string().nullable().optional(),
        originaladdress: z.string().nullable().optional(),
        longitude: z.string().nullable().optional(),
        locationtypes: z.string().nullable().optional(),
        locationswkt: z.string().nullable().optional(),
        housingunits: z.string().nullable().optional(),
        locationaddresses: z.string().nullable().optional(),
        completeddate: z.string().nullable().optional(),
        workclass: z.string().nullable().optional(),
        workclassmapped: z.string().nullable().optional(),
        applicantname: z.string().nullable().optional(),
        communityname: z.string().nullable().optional(),
      }),
    }),
  ),
  crs: z.object({
    type: z.string(),
    properties: z.object({ name: z.string() }),
  }),
});
