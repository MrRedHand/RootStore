import GeneralStore from "@store/GeneralStore/generalStore";
import ClassifierStore from "@store/ClassifierStore/ClassifierStore";
import classifiersTypesStore from "@store/RootStore/ClassifiersTypesStore/classifiersTypesStore";
import classifiersValuesStore from "@store/RootStore/ClassifiersValuesStore/classifiersValuesStore";
import subjectsTypesStore from "@store/RootStore/SubjectsTypesStore/subjectsTypesStore";
import servicesTypesStore from "@store/RootStore/ServicesTypesStore/servicesTypesStore";
import metricsTypesStore from "@store/RootStore/MetricsTypesStore/metricsTypesStore";
import subjectsStore from "@store/RootStore/SubjectsStore/subjectsStore";
import accountStore from "@store/RootStore/AccountStore/accountStore";
import statusesStore from "@store/RootStore/StatusesStore/statusesStore";
import metricTemplatesStore from "@store/RootStore/MetricTemplatesStore/metricTemplatesStore";
import licenseStore from "@store/RootStore/LicenseStore/licenseStore";
import ruleReactTypesStore from "@store/RootStore/RuleReactTypeStore/ruleReactTypesStore"
import ruleReactTypeValuesStore from "@store/RootStore/RuleReactTypeValues/ruleReactTypeValuesStore";
import rulePathBehaviorsStore from "@store/RootStore/RulePathBehaviorsStore/rulePathBehaviorsStore";
import websocketMessagesStore from "@store/RootStore/websocketMessagesStore/websocketMessagesStore";
import eventsStore from "@store/RootStore/EventsStore/eventsStore";

//TODO Заменить классовый рутстор на объектный "rootStore"
//TODO поправить последствия перехода на объектный рутстор

export class RootStore {

  classifierStore: ClassifierStore; //old
  generalStore: GeneralStore; //old

  classifiersTypesStore : typeof classifiersTypesStore
  classifiersValuesStore : typeof classifiersValuesStore
  subjectsTypesStore : typeof subjectsTypesStore
  servicesTypesStore : typeof  servicesTypesStore
  metricsTypesStore : typeof metricsTypesStore
  subjectsStore : typeof subjectsStore
  accountStore : typeof accountStore
  statusesStore : typeof statusesStore
  metricTemplatesStore : typeof metricTemplatesStore
  licenseStore : typeof licenseStore
  ruleReactTypeStore : typeof ruleReactTypesStore
  ruleReactTypeValuesStore : typeof ruleReactTypeValuesStore
  rulePathBehaviorsStore : typeof rulePathBehaviorsStore
  websocketMessagesStore : typeof websocketMessagesStore
  eventsStore : typeof eventsStore

  constructor() {
    this.generalStore = new GeneralStore(); //old
    this.classifierStore = new ClassifierStore(); //old

    this.classifiersTypesStore = classifiersTypesStore //new
    this.classifiersValuesStore = classifiersValuesStore //new
    this.subjectsTypesStore = subjectsTypesStore //new
    this.servicesTypesStore = servicesTypesStore //new
    this.metricsTypesStore = metricsTypesStore //new
    this.subjectsStore = subjectsStore //new
    this.accountStore = accountStore
    this.statusesStore = statusesStore
    this.metricTemplatesStore = metricTemplatesStore
    this.licenseStore = licenseStore
    this.ruleReactTypeStore = ruleReactTypesStore
    this.ruleReactTypeValuesStore = ruleReactTypeValuesStore
    this.rulePathBehaviorsStore = rulePathBehaviorsStore
    this.websocketMessagesStore = websocketMessagesStore
    this.eventsStore = eventsStore
  }
}