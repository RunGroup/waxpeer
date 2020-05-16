"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waxpeer = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
class Waxpeer {
    constructor(api, steam_api) {
        this.baseUrl = 'https://api.waxpeer.com';
        this.version = 'v1';
        this.api = api;
        if (steam_api)
            this.steam_api = steam_api;
    }
    sleep(timer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(res => setTimeout(res, timer));
        });
    }
    /**
     *
     * @param name Market hash name of the item
     * @param price Price, should be greater than item price
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param projectId string
     */
    buyItemWithName(name, price, token, partner, projectId) {
        return this.get('buy-one-p2p-name', 'v1', `name=${encodeURIComponent(name)}&price=${price}&token=${token}&partner=${partner}&project_id=${projectId}`);
    }
    /**
     *
     * @param item_id Item id from fetching items
     * @param price Price of the item 1$=1000
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param projectId string
     */
    buyItemWithId(item_id, price, token, partner, projectId) {
        return this.get('buy-one-p2p', 'v1', `item_id=${item_id}&price=${price}&token=${token}&partner=${partner}&project_id=${projectId}`);
    }
    /**
     *
     * @param ids Ids or id that you recived when purchasing items
     */
    tradeRequestStatus(ids) {
        let id = [];
        if (typeof ids !== 'object')
            id = [ids];
        else
            id = [...ids];
        return this.get('check-many-steam', 'v1', id.map(i => `id=${i}`).join('&'));
    }
    /**
     *
     * @param ids Ids or id that you recived when purchasing items
     */
    checkManyProjectId(ids) {
        let id = [];
        if (typeof ids !== 'object')
            id = [ids];
        else
            id = [...ids];
        return this.get('check-many-project-id', 'v1', id.map(i => `id=${i}`).join('&'));
    }
    /**
     *
     * @param steam_api (optional) you can pass a steam api to waxpeer
     */
    setMyKeys(steam_api) {
        return this.get('set-my-steamapi', 'v1', `steam_api=${steam_api ? steam_api : this.steam_api}&api=${this.api}`);
    }
    /**
     *
     * @param steam_api Your steam API that is linked to waxpeer account
     */
    getTradesToSend(steam_api) {
        return this.get('ready-to-transfer-p2p', 'v2', `steam_api=${steam_api ? steam_api : this.steam_api}`);
    }
    /**
     *
     * @param skip How many items you want to skip
     * @param limit How many items you want to fetch (max 100)
     * @param game Game (csgo,dota2,vgo and etc check https://api.waxpeer.com/docs/#/Steam/get_get_items_list)
     * @param min_price Min price 1$=1000
     * @param max_price Max price
     * @param sort The order in which items are returned in (profit, desc, asc, best_deals)
     * @param minified If you pass this you will recieve additional info like float. Available values : 1, 2
     */
    getItemsList(skip = 0, limit = 50, game = 'csgo', discount = 0, min_price = 0, max_price = 10000000, sort = 'desc', minified = 0) {
        return this.get('get-items-list', `game=${game}&skip=${skip}&limit=${limit}&discount=${discount}&min_price=${min_price}&max_price=${max_price}&sort=${sort}&minified=${minified}`);
    }
    /**
     * Fetches your steam inventory make sure your steamid is connected on waxpeer
     */
    fetchInventory() {
        return this.get('fetch-my-inventory');
    }
    /**
     *
     * @param items Items object  https://api.waxpeer.com/docs/#/Steam/post_list_items_steam
     */
    listItemsSteam(items) {
        return this.post('list-items-steam', items);
    }
    /**
     *
     * @param skip Skip items
     * @param game Game
     */
    getMyInventory(skip = 0, game = 'csgo') {
        return this.get('get-my-inventory', `game=${game}&skip=${skip}`);
    }
    /**
     *
     * @param names Array of item names
     */
    searchItems(names) {
        let searchNames = names.map(i => `name=${encodeURIComponent(i)}`).join('&');
        return this.get('search-items-by-name', searchNames);
    }
    /**
     *
     * @param name Name of an item you want to search
     */
    searchItem(name) {
        return this.get('search-by-name', `name=${encodeURIComponent(name)}`);
    }
    /**
     * Get Profile data
     */
    getProfile() {
        return this.get('user');
    }
    post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { baseUrl, api, version } = this;
            let newUrl = `${baseUrl}/${version}/${url}?api=${api}`;
            let opt = { method: 'POST', body: body };
            return yield this.request(newUrl, opt);
        });
    }
    get(url, v = 'v1', token) {
        return __awaiter(this, void 0, void 0, function* () {
            let { baseUrl, api, version } = this;
            let newUrl = `${baseUrl}/${v ? v : version}/${url}?api=${api}`;
            if (token)
                newUrl += `&${token}`;
            try {
                return yield this.request(newUrl);
            }
            catch (e) {
                throw e;
            }
        });
    }
    request(url, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return JSON.parse(yield request_promise_1.default(url, opt));
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.Waxpeer = Waxpeer;
//# sourceMappingURL=index.js.map