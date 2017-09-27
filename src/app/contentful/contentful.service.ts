import {Injectable} from '@angular/core';
import {createClient, Entry, Space, ContentfulClientApi} from 'contentful';

// change these to include your own settings
const DEFAULT_CONFIG = {
  credentials: {
    space: '0id9s04vraou',
    accessToken: 'c2a3773fb1bcfbc5f12b460f16fbf69afe18eb25a33e6a97467a81591d7b8e7a',
  },

  contentTypeIds: {
    tournaments: 'tournament',
    results: 'results',
    news: 'news'
  }
};

@Injectable()
export class ContentfulService {
  cdaClient: ContentfulClientApi;
  config: {
    space: string,
    accessToken: string
  };
  titleHandlers: Function[];

  constructor() {
    try {
      this.config = JSON.parse(localStorage.catalogConfig);
    } catch (e) {
      this.config = DEFAULT_CONFIG.credentials;
    }

    this.titleHandlers = [];
    this._createClient();
    this.getSpace();
  }

  onTitleChange(fn): void {
    this.titleHandlers.push(fn)
  }

  // get the current space
  getSpace(): Promise<Space> {
    return this.cdaClient.getSpace()
      .then(space => {
        this.titleHandlers.forEach(handler => handler(space.name))

        return space;
      })
  }

  // fetch results
  getResults(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.results
    }, query))
      .then(res => res.items);
  }

  // fetch tournaments
  getTournaments(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.tournaments
    }, query))
      .then(res => res.items);
  }

  // fetch news
  getNews(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: DEFAULT_CONFIG.contentTypeIds.news
    }, query))
      .then(res => res.items);
  }


  // return a custom config if available
  getConfig(): { space: string, accessToken: string } {
    return this.config !== DEFAULT_CONFIG.credentials ?
      Object.assign({}, this.config) :
      {space: '', accessToken: ''};
  }

  // set a new config and store it in localStorage
  setConfig(config: { space: string, accessToken: string }) {
    localStorage.setItem('catalogConfig', JSON.stringify(config));
    this.config = config;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  // set config back to default values
  resetConfig() {
    localStorage.removeItem('catalogConfig');
    this.config = DEFAULT_CONFIG.credentials;

    this._createClient();
    this.getSpace();

    return Object.assign({}, this.config);
  }

  _createClient() {
    this.cdaClient = createClient({
      space: this.config.space,
      accessToken: this.config.accessToken
    });
  }
}
