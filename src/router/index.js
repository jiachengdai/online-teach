import {createRouter,createWebHistory}from 'vue-router'

import LoginVue from '../views/Login.vue';
import stu from '@/views/stu/index.vue';
import stuCourse from '@/views/stu/course/index.vue'
import courseInfo from '@/views/stu/course/info.vue'
import courseExam from '@/views/stu/course/exam.vue'
 import courseTest from '@/views/stu/course/test.vue'
import courseSlides from '@/views/stu/course/slides.vue'
import courseChapters from '@/views/stu/course/Chapters.vue'
import testPage from '../views/stu/course/testPage.vue';
import tea from '@/views/tea/index.vue';
import teaCourse from '@/views/tea/course/index.vue'
import teaCourseInfo from '@/views/tea/course/info.vue'
import teaCourseExam from '@/views/tea/course/exam.vue'
import teaCourseTest from '@/views/tea/course/test.vue'
import teaCourseSlides from '@/views/tea/course/slides.vue'
import teaTestPage from '../views/tea/course/testPage.vue';
import teaCourseStudents from '@/views/tea/course/students.vue';
import teaCourseChapters from '@/views/tea/course/ChapterManage.vue';
import adminStu from '@/views/admin/students.vue';
import adminTea from '@/views/admin/teachers.vue';
import admin from '@/views/admin/index.vue';
import adminCourse from '@/views/admin/course.vue';
import AIAssistant from '@/views/stu/course/AIAssistant.vue';
 const routes=[
    {path:'/login',component:LoginVue},
    {path:'/', redirect:'/login'},
     {path:'/stu',component:stu},
    {path:'/stu/course',component:stuCourse,children:[
        {path:'/stu/course/info',component:courseInfo},
         {path:'/stu/course/test',component:courseTest},
        {path:'/stu/course/slides',component:courseSlides},
        {path:'/stu/course/exam', component:courseExam},
        {path:'/stu/course/chapters', component:courseChapters},
        {path:'/stu/course/AI_assistant', component:AIAssistant},
    ]},
    {path:'/stu/testPage',component:testPage},
     {path:'/tea',component:tea},
    {path:'/tea/course',component:teaCourse,children:[
        {path:'/tea/course/chapters',component:teaCourseChapters},
        {path:'/tea/course/info',component:teaCourseInfo},
         {path:'/tea/course/test',component:teaCourseTest},
        {path:'/tea/course/slides',component:teaCourseSlides},
        {path:'/tea/course/exam', component:teaCourseExam},
        {path:'/tea/course/students',component:teaCourseStudents},

    ]},
    {path:'/tea/testPage',component:teaTestPage},
    {path:'/admin',component:admin,children:[
{path:'/admin/student',component:adminStu},
{path:'/admin/tea',component:adminTea},
{path:'/admin/course',component:adminCourse},]}

]
const router=createRouter({
    history:createWebHistory(),
    routes:routes
})
export default router