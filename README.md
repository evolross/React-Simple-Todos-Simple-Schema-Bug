# React-Simple-Todos-Simple-Schema-Bug
Created to illustrate a bug in Meteor Collection2, Simple Schema, and Collection Hooks

**Describe the bug**

Ran into an issue upgrading my project to Meteor 2.16 from 2.7.2 (on my way up to 3.0).

When using `aldeed:collection2@4.0.2` with the included `aldeed:simple-schema@1.13.1` on a Meteor 2.16 project along with `matb33:collection-hooks@1.3.1` (latest version), using the collection hook's `direct` versions that bypass a collection's hook will cause the `defaultValue` and `autoValue` set in the schema to also not run. The added logic in the defined simple schema gets bypassed and the document gets inserted/updated as if simple schema doesn't exist. I have tested `matb33:collection-hooks` and it seems the problem is rooted in `aldeed:collection2` or `aldeed:simple-schema`. If you drop back down to `aldeed:collection2@3.5.0` and use `meteor npm install simpl-schema@1.12.3` with any version of `matb33:collection-hooks` all works as expected.

**To Reproduce**

I've hotrodded the React Simple Todos demo to display the error in a repo here.

The repo has the following currently added:

```
aldeed:collection2@4.0.2
aldeed:simple-schema@1.13.1
matb33:collection-hooks@1.3.1
```


1. Click on the **Add New Link** button.

A link will be inserted in the list _without_ using the `direct` version in the `insert`. The `insert` is performed and the link's `title`, `description`, and `createdAt` are all successfully set using either Simple Schema's `defaultValue` or `autoValue`. You'll also notice the link's `linkType` is set to "video" by the defined and working `LinksCollection.before.insert` hook.

2. Click on the **Add New Link (Direct)** button.

A link will be inserted in the list _using_ the `direct` version in the `insert`. The `insert` is performed but the link will not get any of the Simple Schema logic (e.g. `defaultValue` or `autoValue`) however it does get inserted. And the hook is not performed so its `linkType` is still "website".

**Expected behavior**

Making use of a `matb33:collection-hook` `direct` call should _still_ run the Simple Schema logic (e.g. `defaultValue` or `autoValue`) and validation. Using `aldeed:collection2@3.5.0` and `meteor npm install simpl-schema@1.12.3` all works as expected. Feel free to comment out `aldeed:collection2` and uncomment `aldeed:collection2@3.5.0` in the `packages.js` file and then do a `meteor npm install simpl-schema@1.12.3` and then update the `import` in `links.js` to see it working correctly on the prior versions.
