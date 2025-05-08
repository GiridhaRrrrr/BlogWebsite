import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import config from '../config/config'
import { Controller } from 'react-hook-form' //does the same work as forward ref but provides extra options

function RTE({name, control, label, defaultValue = ""}) { //this control is responsible to link this component to parent component this comes from parent component
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller //this controller only gives control of component to parent component their are few fields in it like name, control,render
    name={name || "content"}
    control = {control} //the one passed by parent component for linking
    render = {({field: {onChange}}) => ( //this render takes a call back {() => ()} in that 
    // it takes the field ie the component on change inform the parent element to rerender and in that callback we write the component ie in this case the editor
        <Editor //this is editor component read it s documentation
        initialValue = {defaultValue}
        apiKey = {config.tinymce_api}
        init = {{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange} //so on change in this editor the onchnage method is triggerd and the field cathes it and informs the parent component
        />
    )}
    />

     </div>
  
  )
}

export default RTE
// import React, { useEffect, useState } from 'react';
// import { Controller } from 'react-hook-form';
// import { Editor } from '@tinymce/tinymce-react';
// import { motion } from 'framer-motion';
// import config from '../config/config';

// function RTE({ name, control, label, defaultValue = "", rules = {}, error }) {
//   const [editorReady, setEditorReady] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   useEffect(() => {
//     // Simulate loading time for the editor
//     const timer = setTimeout(() => {
//       setEditorReady(true);
//     }, 200);
    
//     return () => clearTimeout(timer);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.4 }
//     }
//   };

//   return (
//     <motion.div 
//       className="w-full mb-6"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {label && (
//         <label 
//           className="block mb-2 font-medium text-gray-700 dark:text-gray-300 text-sm"
//         >
//           {label}
//         </label>
//       )}
      
//       <div 
//         className={`relative rounded-lg overflow-hidden border ${
//           error 
//             ? "border-red-500 shadow-sm shadow-red-200 dark:shadow-red-900/20" 
//             : isFocused 
//               ? "border-blue-500 shadow-sm shadow-blue-200 dark:shadow-blue-900/20" 
//               : "border-gray-300 dark:border-gray-600"
//         } transition-all duration-200`}
//       >
//         {!editorReady && (
//           <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
//             <div className="flex flex-col items-center">
//               <svg 
//                 className="animate-spin h-8 w-8 text-blue-500 mb-2" 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 fill="none" 
//                 viewBox="0 0 24 24"
//               >
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               <span className="text-gray-500 dark:text-gray-400 text-sm">Loading editor...</span>
//             </div>
//           </div>
//         )}
        
//         <div className={editorReady ? "block" : "hidden"}>
//           <Controller
//             name={name}
//             control={control}
//             rules={rules}
//             defaultValue={defaultValue}
//             render={({ field: { onChange, value, ref } }) => (
//               <Editor
//                 // apiKey = {config.tinymce_api}
//                 apiKey='dl98l0o62lrfus7vkl1hpq67r17ijdmjtuvcsoy9hi4lrh92'
//                 value={value}
//                 onEditorChange={onChange}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 init={{
//                   height: 400,
//                   menubar: false,
//                   plugins: [
//                     'advlist autolink lists link image charmap print preview anchor',
//                     'searchreplace visualblocks code fullscreen',
//                     'insertdatetime media table paste code help wordcount'
//                   ],
//                   toolbar:
//                     'undo redo | formatselect | bold italic backcolor | \
//                     alignleft aligncenter alignright alignjustify | \
//                     bullist numlist outdent indent | removeformat | help',
//                   content_style: `
//                     body {
//                       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//                       font-size: 16px;
//                       line-height: 1.5;
//                       color: #374151;
//                       background-color: #ffffff;
//                     }
//                     @media (prefers-color-scheme: dark) {
//                       body {
//                         color: #e5e7eb;
//                         background-color: #1f2937;
//                       }
//                     }
//                   `,
//                   skin: 'oxide',
//                   skin_url: '/tinymce/skins/ui/oxide',
//                   toolbar_mode: 'sliding',
//                   contextmenu: 'link image table',
//                   browser_spellcheck: true,
//                   automatic_uploads: true,
//                   placeholder: 'Start writing your blog post here...',
//                   images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
//                     // Implement your image upload logic here
//                     // This is just a placeholder that returns a fake URL
//                     setTimeout(() => {
//                       resolve('https://picsum.photos/id/' + Math.floor(Math.random() * 1000) + '/800/600');
//                     }, 2000);
//                   }),
//                 }}
//               />
//             )}
//           />
//         </div>
//       </div>
      
//       {error && (
//         <motion.p 
//           className="mt-1.5 text-sm text-red-600 dark:text-red-400"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           {error}
//         </motion.p>
//       )}
      
//       <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
//         <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         Tip: You can use Markdown shortcuts like # for headings and * for lists
//       </div>
      
//       <div className="hidden md:flex space-x-1.5 mt-3">
//         <QuickFormatButton
//           onClick={() => document.execCommand('bold', false, null)}
//           title="Bold"
//           icon={
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M13.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-7.5 0a5 5 0 1110 0 5 5 0 01-10 0z" />
//             </svg>
//           }
//         />
//         <QuickFormatButton
//           onClick={() => document.execCommand('italic', false, null)}
//           title="Italic"
//           icon={
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//           }
//         />
//         <QuickFormatButton
//           onClick={() => document.execCommand('insertUnorderedList', false, null)}
//           title="Bullet List"
//           icon={
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//             </svg>
//           }
//         />
//         <QuickFormatButton
//           onClick={() => document.execCommand('insertOrderedList', false, null)}
//           title="Numbered List"
//           icon={
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
//             </svg>
//           }
//         />
//       </div>
//     </motion.div>
//   );
// }

// // Quick formatting buttons component
// function QuickFormatButton({ onClick, title, icon }) {
//   return (
//     <motion.button
//       type="button"
//       onClick={onClick}
//       className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
//       title={title}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {icon}
//     </motion.button>
//   );
// }

// export default RTE;