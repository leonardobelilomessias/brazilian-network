'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeletePostDialog({deletePostForum, id,owner,getforumPosts}:{deletePostForum:(id:string,owner:boolean)=>Promise<void>,id:string,owner:boolean,getforumPosts:(isPrevious:boolean,isFirst:boolean)=>Promise<void>}) {
  const router = useRouter()
    async function execDeletePostForum(id:string,owner:boolean){
        await deletePostForum(id,owner)
        router.replace("/forum")
        // await getforumPosts(false,true)

    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash2 size={18}/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja deletar seu post?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não podera ser revertida. Essa postagem será escluida definitivamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={()=>execDeletePostForum(id,owner)}> Deletar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  