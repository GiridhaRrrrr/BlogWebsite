import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
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
