import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const showLivrosTrigger = trigger('showLivros', [
  transition('* => *', [
    query(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        stagger(90, [
          animate( '200ms ease-out', keyframes([
              style({ offset: 0, transform: 'translateX(-50px)',  opacity: 0 }),
              style({ offset: 0.5, transform: 'translateX(-25px)', opacity: 0.5 }),
              style({ offset: 1, transform: 'none', opacity: 1 }),
            ])
          ),
        ]),
      ], { optional: true }),
      query(':leave', [
          stagger(90, [
            animate( '200ms ease-out', keyframes([
              style({ offset: 0, transform: 'none', opacity: 1 }),
              style({ offset: 0.5, transform: 'translateX(-25px)', opacity: 0.5 }),
              style({ offset: 1, transform: 'translateX(-50px)', opacity: 0 }),
              ])
            ),
          ]),
        ],{ optional: true }
      )
  ]),
]);
