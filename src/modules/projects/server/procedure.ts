import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";
export const projectRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({
        id:z.string().min(1,{message:"ID is required"}),
    })).query(async({input,ctx})=>{
        const project = await prisma.project.findUnique({
            where:{
                id:input.id,
                userId:ctx.auth.userId,
            },
        })
        if(!project) throw new TRPCError({code:"NOT_FOUND",message:"Project not found"})
        return project
    }),
    getMany: protectedProcedure.query(async({ctx})=>{
        const projects = await prisma.project.findMany({
            where:{
                userId:ctx.auth.userId,
            },
            orderBy:{
                updatedAt:"desc"
            },
        })
        return projects
    }),
    create: protectedProcedure
        .input(z.object({
            value:z.string().min(1,{message:"Value is required"}).max(10000,{message:"Value is too long"}),
        })
        )
        .mutation(async({input,ctx})=>{
            const createdProject = await prisma.project.create({
                data:{
                    name:generateSlug(2,{format:"kebab"}),
                    messages:{
                        create:{
                            content:input.value,
                            role:"USER",
                            type:"RESULT"
                        }
                    },
                    userId:ctx.auth.userId,
                }
            })
           
            await inngest.send({
                name:"code-agent/run",
                data:{
                    value:input.value,
                    projectId:createdProject.id,
                }
            })
            return createdProject   
        })


})