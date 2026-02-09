## Performance

### FrameRate <a id="frame-rate"></a>

Utility class for controlling FPS calls.

- [new FrameRate(fps?)](#frame-rate-constructor)
  - [.fps](#frame-rate-fps): `number`
  - [.update()](#frame-rate-update-method): `boolean`

#### Constructor <a id="frame-rate-constructor"></a>

| Parameter | Type     | Default | Description             |
| --------- | -------- | ------- | ----------------------- |
| [fps]     | `number` | `60`    | Frame per second limit. |

#### Properties

##### .`fps` <a id="frame-rate-fps"></a>

Frame per second limit.

```ts
FrameRate.fps: number;
```

#### Methods

##### .`update()` <a id="frame-rate-update-method"></a>

Check if elapsed time since last update is higher than current FPS limit.

```ts
FrameRate.update(): boolean;
```
