# meteor-autoform-faicon
AutoForm extension to select a font awesome icon from a list of icons. Will only save the icon classname without the  `fa-` prefix.

### Current status

- only single element selectable (multiple will follow)
- only font awesome 4.7 (fa 5 will follow, including backwards compatibility)
- hrd dependency to js-yaml, will be decoupled

### Usage

Define the icon type as any other AutoForm extension in your simple schema:

```javascript
{
  icon: {
    type: String,
    label: 'List element icon',
    autoform: {
      type: 'faicon',		
      multiple: true, // Coming soon
      version: 5,     // Coming soon
      options() {
        return  [/* list of icons */] // coming soon
      }
    },
  },
}
```
