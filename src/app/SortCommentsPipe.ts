import { Pipe, PipeTransform } from '@angular/core';
import Comment from './Comment';

@Pipe({ 
    name: 'sortComments', 
    pure: false 
})
export default class SortCommentsPipe implements PipeTransform {
  transform(comments: Comment[] | null) {
    let commentsCopy: Comment[] = []

    for (const comment of comments ?? []) {
      commentsCopy.push({...comment})
    }

    commentsCopy.sort((item1, item2) => {
      return (item1.added > item2.added)
        ? -1
        : 1
    })

    return commentsCopy ? commentsCopy : undefined
  }
}