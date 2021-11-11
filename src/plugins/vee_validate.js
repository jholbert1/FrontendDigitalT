import Vue from 'vue';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import vspanish from 'vee-validate/dist/locale/es';

for (let rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: vspanish.messages[rule]
  });
}

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);