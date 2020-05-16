import RequestPromise from 'request-promise';
import { FetchInventory, GetItems, GetMySteamInv, IBuy, ISetMyKeys, IUser, ListedItem, ListItems, ReadyToTransfer, TradesStatus } from './types/waxpeer';
export declare class Waxpeer {
    private api;
    baseUrl: string;
    version: string;
    private steam_api;
    constructor(api: string, steam_api?: string);
    sleep(timer: number): Promise<void>;
    /**
     *
     * @param name Market hash name of the item
     * @param price Price, should be greater than item price
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param projectId string
     */
    buyItemWithName(name: string, price: number, token: string, partner: string, projectId: string): Promise<IBuy>;
    /**
     *
     * @param item_id Item id from fetching items
     * @param price Price of the item 1$=1000
     * @param token Token from tradelink
     * @param partner Partner from tradelink
     * @param projectId string
     */
    buyItemWithId(item_id: number, price: number, token: string, partner: string, projectId: string): Promise<IBuy>;
    /**
     *
     * @param ids Ids or id that you recived when purchasing items
     */
    tradeRequestStatus(ids: number | number[] | string | string[]): Promise<TradesStatus>;
    /**
     *
     * @param ids Ids or id that you recived when purchasing items
     */
    checkManyProjectId(ids: number | number[] | string | string[]): Promise<TradesStatus>;
    /**
     *
     * @param steam_api (optional) you can pass a steam api to waxpeer
     */
    setMyKeys(steam_api?: string): Promise<ISetMyKeys>;
    /**
     *
     * @param steam_api Your steam API that is linked to waxpeer account
     */
    getTradesToSend(steam_api?: string): Promise<ReadyToTransfer>;
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
    getItemsList(skip?: number, limit?: number, game?: string, discount?: number, min_price?: number, max_price?: number, sort?: string, minified?: number): Promise<GetItems>;
    /**
     * Fetches your steam inventory make sure your steamid is connected on waxpeer
     */
    fetchInventory(): Promise<FetchInventory>;
    /**
     *
     * @param items Items object  https://api.waxpeer.com/docs/#/Steam/post_list_items_steam
     */
    listItemsSteam(items: ListedItem[]): Promise<ListItems>;
    /**
     *
     * @param skip Skip items
     * @param game Game
     */
    getMyInventory(skip?: number, game?: string): Promise<GetMySteamInv>;
    /**
     *
     * @param names Array of item names
     */
    searchItems(names: string[]): Promise<GetItems>;
    /**
     *
     * @param name Name of an item you want to search
     */
    searchItem(name: string): Promise<GetItems>;
    /**
     * Get Profile data
     */
    getProfile(): Promise<IUser>;
    post<T = object>(url: string, body: any): Promise<T>;
    get<T = object>(url: string, v?: string, token?: string): Promise<T>;
    request<T = object>(url: string, opt?: RequestPromise.RequestPromiseOptions): Promise<T>;
}
