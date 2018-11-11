/* global AutoForm */
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { ReactiveVar } from 'meteor/reactive-var'
import { $ } from 'meteor/jquery'
import { HTTP } from 'meteor/http'
import './autoform-faicon.css'
import './autoform-faicon.html'

// Modules to get the fa icon list
const jsyaml = require('js-yaml')

AutoForm.addInputType('faicon', {
  template: 'afFaicon',
  valueOut () {
    return this.val()
  },
  valueIn (initialValue) {
    return initialValue
  }
})

const toKey = function (iconId) {
  return iconId.replace(/-/g, '')
}

const url = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/fa-4/src/icons.yml'
const iconsMap = new ReactiveVar()

Meteor.startup(() => {
  HTTP.get(url, (error, response) => {
    if (error) {
      throw error
    }
    if (!response) {
      throw new Error('jkuester:autoform-faicon: no response received. Check your network connectivity.')
    }
    const body = response.content
    const parsedYaml = jsyaml.load(body)

    const unordered = {}
    for (let entry of parsedYaml.icons) {
      unordered[ toKey(entry.id) ] = entry.id
    }

    const ordered = []
    Object.keys(unordered).sort().forEach(function (key) {
      ordered.push(unordered[ key ])
    })
    iconsMap.set(ordered)
  })
})

Template.afFaicon.onCreated(function () {
  const instance = this
  const { atts } = this.data

  instance.key = new ReactiveVar(atts[ 'data-schema-key' ] || '')
  instance.filter = new ReactiveVar()
  instance.loadComplete = new ReactiveVar(false)
  instance.selected = new ReactiveVar(this.data.value)

  instance.autorun(function () {
    const _icons = iconsMap.get()
    if (typeof _icons === 'object') {
      instance.loadComplete.set(true)
    }
  })
})

Template.afFaicon.helpers({
  dataSchemaKey () {
    return Template.instance().key.get()
  },
  loadComplete () {
    return Template.instance().loadComplete.get()
  },
  entries () {
    const filter = Template.instance().filter.get()
    const icons = iconsMap.get()
    if (filter && filter.length > 0) {
      return icons.filter(el => el.indexOf(filter) > -1)
    } else {
      return icons
    }
  },
  selected () {
    return Template.instance().selected.get()
  },
  isSelected (value) {
    return Template.instance().selected.get() === value
  }
})

Template.afFaicon.events({

  'click .af-faicon-entry' (event, templateInstance) {
    event.preventDefault()

    const target = $(event.currentTarget).attr('data-icon')
    const selected = templateInstance.selected.get()

    const value = target !== selected ? target : null
    templateInstance.selected.set(value)
  },

  'input #afFaIcon-filter' (event, templateInstance) {
    event.preventDefault()
    const value = $(event.currentTarget).val()
    templateInstance.filter.set(value)
  }
})
