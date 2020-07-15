// STORE ITENS CONFIG'S
import { IEntityState as fromAuthEntityState } from '@store/authentication/auth.interface';
import { IEntityState as fromWorldEntityState } from '@store/world/world.interface';
import { IEntityState as fromWeatherEntityState } from '@store/weather/weather.interface';

export default interface IStoreState {
	authentication: fromAuthEntityState;
	world: fromWorldEntityState;
	weather: fromWeatherEntityState;
}
